"use client";

import { useState } from "react";

type Output = { guidance: string; quote: string; author: string; };

const stripWrappingQuotes = (s: string) =>
  s
    .trim()
    .replace(/^[“”"'‘’\s]+/, "")
    .replace(/[“”"'‘’\s]+$/, "");

export default function HomePage() {
  const [situation, setSituation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Output | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setData(null);
    setLoading(true);
    try {
      const res = await fetch("/api/guidance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation }),
      });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(msg.error || "Request failed");
      }
      const out = (await res.json()) as Output;

      // Sanitize: ensure quote has no wrapping quotes; remove accidental duplication in guidance
      out.quote = stripWrappingQuotes(out.quote);
      if (out.guidance.includes(out.quote)) {
        out.guidance = out.guidance.replace(out.quote, "").trim();
      }

      setData(out);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-sm font-medium" htmlFor="situation">
          Describe your situation
        </label>
        <textarea
          id="situation"
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder='e.g., "I am on vacation and it will be raining all week! 😫"'
          required
          maxLength={500}
          className="w-full min-h-28 rounded-2xl border p-3 outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
        />
        <div className="flex items-center justify-between text-xs opacity-70">
          <span>{situation.length}/500</span>
          <button
            type="submit"
            disabled={loading || !situation.trim()}
            className="rounded-xl px-4 py-2 text-sm font-bold text-white bg-[#33CC33] hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Thinking…" : "Get Stoic Guidance"}
          </button>
        </div>
      </form>

      {error && (
        <div role="alert" className="mt-6 rounded-xl border border-red-500/40 bg-red-500/5 p-3 text-sm">
          {error}
        </div>
      )}

      {data && (
        <section className="mt-8 space-y-4">
          <div className="rounded-2xl border p-4">
            <h2 className="mb-2 text-lg font-semibold">Guidance</h2>
            <div className="leading-relaxed space-y-4">
              {data.guidance.split(/\n\s*\n/).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <figure className="rounded-2xl border p-4">
            <blockquote className="italic leading-relaxed">“{data.quote}”</blockquote>
            <figcaption className="mt-2 text-sm opacity-80">— {data.author}</figcaption>
          </figure>
        </section>
      )}
    </main>
  );
}
