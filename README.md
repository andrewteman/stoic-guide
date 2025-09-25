# Stoic Guide

A tiny Next.js app that turns any situation into Stoic guidance with a relevant quote.

## Stack

- Next.js App Router (TypeScript), TailwindCSS
- API route at `app/api/guidance/route.ts`
- OpenAI Responses API with JSON schema structured output

## Notes

- Quotes are drawn from public‑domain Stoic sources.
- The model returns a strict JSON payload: `{ guidance, quote, author }`.
- Default model is `gpt-4.1-mini` (fast, inexpensive). Override via `OPENAI_MODEL`.
