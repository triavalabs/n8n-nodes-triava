# n8n-nodes-triava

n8n community node for sovereign Gemma 4 text generation on self-hosted Ollama endpoints

## Status

Active development. Released and in production use at [Triava Labs](https://triavalabs.com). Iterating based on real usage. Production deployment writeup on [DEV.to](https://dev.to/cloudninealt/self-hosting-gemma-4-for-production-automation-revealed-two-ollama-bugs-1oo4).

## What it does

Connects n8n workflows to a self-hosted Gemma 4 endpoint via Ollama's native `/api/generate` API. Drop it into any workflow to run brand-voice content generation, drafting, or summarization through infrastructure you own.

Built around `triava-prod` — a custom Gemma 4 26B MoE model with Triava's brand voice baked in. Also works with any Ollama-served Gemma 4 variant.

## Why

Self-hosted LLM inference shouldn't require custom integration work for every workflow tool. This node makes a sovereign Gemma 4 endpoint a first-class n8n citizen — your model, your voice, your automation.

## Node fields

| Field         | Required | Description                                      |
| ------------- | -------- | ------------------------------------------------ |
| Model         | Yes      | Model identifier (default: `triava-prod:latest`) |
| Message       | Yes      | The prompt or content brief to send              |
| System Prompt | No       | Override the model's built-in system prompt      |
| Max Tokens    | No       | Maximum tokens to generate (default: 2048)       |
| Temperature   | No       | Sampling temperature 0–2 (default: 0.7)          |

## Models supported

- `triava-prod:latest` — custom Gemma 4 26B MoE with Triava brand voice
- `gemma4:26b` — base Gemma 4 26B MoE
- `gemma4:e4b` — Gemma 4 edge variant

Default endpoint: `https://api.triavalabs.com` — or configure any Ollama instance.

## Installation

npm publish in progress. Until the package is live on npm, install via cloning:

1. Clone this repo into your n8n custom nodes directory
2. Run `npm install` inside the cloned directory
3. Build with `npm run build`
4. Restart n8n

Once the package publishes to npm, the standard n8n community node install path will work:

1. Go to **Settings → Community Nodes**
2. Click **Install**
3. Enter `n8n-nodes-triava`
4. Restart n8n

## Credential setup

Create a **Triava API** credential with:

- **Base URL:** your Ollama endpoint (e.g. `https://api.triavalabs.com`)
- **API Key:** leave blank if your endpoint doesn't require auth

## Known considerations

- Uses Ollama's native `/api/generate` endpoint rather than the OpenAI-compatible `/v1/chat/completions` path. This is intentional — Gemma 4's native thinking mode interacts with the `/v1/` endpoint in a way that produces empty responses (confirmed upstream Ollama issue [#15288](https://github.com/ollama/ollama/issues/15288)). The native endpoint handles Gemma 4's output correctly and runs ~4x faster.
- For best results with `triava-prod`, leave the System Prompt field blank — the brand voice is baked into the model.
- Very long prompts (2000+ characters) may trigger an upstream Ollama issue ([#15428](https://github.com/ollama/ollama/issues/15428)) with the Gemma 4 26B MoE. Keep prompts focused.

## License

MIT

---

Built by [Triava Labs](https://triavalabs.com) · [GitHub](https://github.com/triavalabs/n8n-nodes-triava)
