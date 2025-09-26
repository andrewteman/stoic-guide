import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

export async function POST(req: Request) {
  try {
    const { situation } = await req.json();

    if (!situation || typeof situation !== "string") {
      return NextResponse.json({ error: "Missing 'situation' string." }, { status: 400 });
    }
    if (situation.length > 500) {
      return NextResponse.json({ error: "Situation too long (max 500 chars)." }, { status: 400 });
    }

    // ...above code unchanged...

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ---- add this helper object (typed as any) ----
const textFormat: any = {
  format: {
    type: "json_schema",
    json_schema: {
      name: "StoicGuideOutput",
      strict: true,
      schema: {
        type: "object",
        properties: {
          guidance: {
            type: "string",
            description:
              "Stoic advice with depth (150–250 words), in 2–3 short paragraphs, including an actionable step and a historical example. Do not include direct quotations here."
          },
          quote: {
            type: "string",
            description:
              "Relevant public-domain quote (<= 50 words). Do not include surrounding quotation marks."
          },
          author: {
            type: "string",
            description: "Quote author (e.g., Marcus Aurelius, Seneca, Epictetus)."
          }
        },
        required: ["guidance", "quote", "author"],
        additionalProperties: false
      }
    }
  }
};
// -----------------------------------------------

const response = await client.responses.create({
  model: MODEL,
  input: [
    {
      role: "system",
      content: [
        "You are Stoic Guide: offer thoughtful, substantial Stoic guidance rooted in the dichotomy of control and the four virtues (wisdom, courage, justice, temperance). Tone: calm, direct, non-judgmental.",
        "Always:",
        "• Provide at least one actionable step the user can take.",
        "• Weave in a concrete historical example from a Stoic thinker’s life (e.g., Marcus Aurelius during war, Epictetus enduring slavery, Seneca advising on wealth).",
        "• Do NOT include direct quotations in the guidance.",
        "• Put NO surrounding quotation marks in the `quote` field (text only).",
        "• End with one relevant public-domain Stoic quote and author in the dedicated fields.",
        "• Provide 2–3 short paragraphs separated by a blank line. Keep guidance between 150–250 words."
      ].join("\\n")
    },
    { role: "user", content: `User situation: ${situation}` },
  ],
  // 👇 Type-cast to avoid the outdated SDK type error
  text: textFormat,
  temperature: 0.7,
});

    const jsonText = response.output_text;
    let parsed: any;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      const match = jsonText.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : null;
    }

    if (!parsed || !parsed.guidance) {
      return NextResponse.json({ error: "Bad model response." }, { status: 502 });
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
