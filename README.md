# Stoic Guide

A tiny Next.js app that turns any situation into Stoic guidance with a relevant quote.

## Quickstart

1) **Download & install**  
```bash
npm i
npm run dev
```
(If you haven't yet: `cp .env.example .env.local` and set your `OPENAI_API_KEY`.)

2) **Use it locally** at http://localhost:3000

3) **Deploy to Vercel**  
- Create a new project and import this repo.  
- In **Vercel → Settings → Environment Variables**, add `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`).  
- Deploy.

## Stack

- Next.js App Router (TypeScript), TailwindCSS
- API route at `app/api/guidance/route.ts`
- OpenAI Responses API with JSON schema structured output

## Notes

- Quotes are drawn from public‑domain Stoic sources.
- The model returns a strict JSON payload: `{ guidance, quote, author }`.
- Default model is `gpt-4.1-mini` (fast, inexpensive). Override via `OPENAI_MODEL`.
