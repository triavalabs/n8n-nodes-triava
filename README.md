# n8n-nodes-triava

n8n community node for [Triava](https://triavalabs.com) — OpenAI-compatible drop-in for self-hosted Gemma 4 endpoints.

## Status

Active development. Built for the [Gemma 4 Challenge](https://dev.to/t/gemmachallenge) (Build with Gemma 4 track). v1 ships May 24, 2026.

## What it does

Wraps a self-hosted Gemma 4 endpoint (served via Ollama or compatible) as an OpenAI-compatible node for n8n workflows. Drop into any workflow where you'd use the official OpenAI node — point it at your own infrastructure instead.

## Why

Self-hosted LLM inference shouldn't require custom integration work. If your endpoint speaks the OpenAI Chat Completions spec, it should work with the tools you already use.

## Models supported

- `triava-prod:latest` — custom Gemma 4 26B derivative
- `gemma4:26b` — base Gemma 4 26B
- `gemma4:e4b` — Gemma 4 small variant

Endpoint: `https://api.triavalabs.com` (or any OpenAI-compatible endpoint you configure).

## License

MIT

---

Built by [Triava Labs](https://triavalabs.com).
