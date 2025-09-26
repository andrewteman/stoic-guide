# Stoic Guide (Deploy‑Ready)

A tiny Next.js app that turns any situation into Stoic guidance with a relevant quote.

## One‑Minute Deploy (Vercel CLI)
```bash
npm i -g vercel             # if not installed
vercel login                # one-time
cd stoic-guide              # this folder after unzipping
cp .env.example .env.local  # add your real OPENAI_API_KEY
npm i
vercel link                 # create/select a project
vercel env add OPENAI_API_KEY
# optional:
# vercel env add OPENAI_MODEL

vercel deploy --prod
```

## Local Dev
```bash
npm i
cp .env.example .env.local  # add your key
npm run dev
# open http://localhost:3000
```

## Notes
- API route: `app/api/guidance/route.ts` uses OpenAI Responses API with `text.format.json_schema`.
- Guidance: 150–250 words, includes a historical example + actionable step; quotes are kept separate.
- UI: purple submit button (#CC33CC), clean paragraph formatting, footer links.
