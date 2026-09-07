# n8n-nodes-triava

n8n community node for text generation through self-hosted Ollama endpoints.

## Status

- **GitHub release:** v0.1.1 is available from this repository.
- **Internal deployment:** the node is in active use at Triava Labs and is being iterated against real workflows.
- **npm availability:** the package has not been published to npm. Installation currently requires cloning and building the repository.

The production deployment and the endpoint behavior that shaped this implementation are documented in the [Triava Labs writeup on DEV](https://dev.to/cloudninealt/self-hosting-gemma-4-for-production-automation-revealed-two-ollama-bugs-1oo4).

## What it does

Connects n8n workflows to a self-hosted Gemma 4 endpoint through Ollama's native `/api/generate` API. It supports text generation, drafting, and summarization in n8n workflows running against infrastructure you control.

The node was built around `triava-prod`, a custom Gemma 4 26B MoE model used by Triava Labs. It also works with Ollama-served Gemma 4 variants.

## Why

Self-hosted inference often requires one-off integration work before it can participate in an automation workflow. This node exposes an Ollama-served Gemma 4 endpoint as an n8n node with configurable model, message, system prompt, token limit, and temperature fields.

## Node fields

| Field | Required | Description |
| --- | --- | --- |
| Model | Yes | Model identifier (default: `triava-prod:latest`) |
| Message | Yes | The prompt or content brief to send |
| System Prompt | No | Override the model's built-in system prompt |
| Max Tokens | No | Maximum tokens to generate (default: 2048) |
| Temperature | No | Sampling temperature from 0 to 2 (default: 0.7) |

## Models supported

- `triava-prod:latest` - custom Gemma 4 26B MoE with Triava brand voice
- `gemma4:26b` - base Gemma 4 26B MoE
- `gemma4:e4b` - Gemma 4 edge variant

The default endpoint is `https://api.triavalabs.com`. You can configure another Ollama instance in the credential.

## Installation

The node is available as a GitHub release and is not currently published to npm.

1. Clone this repository into your n8n custom-nodes directory.
2. Run `npm install` inside the cloned directory.
3. Build with `npm run build`.
4. Restart n8n.

The standard n8n Community Nodes installation flow will become available only after an npm package is published.

## Credential setup

Create a **Triava API** credential with:

- **Base URL:** your Ollama endpoint, such as `https://api.triavalabs.com`
- **API Key:** leave blank only when your endpoint does not require authentication

## Known considerations

- This node uses Ollama's native `/api/generate` endpoint rather than the OpenAI-compatible `/v1/chat/completions` path. In the Triava Labs production configuration documented in the linked writeup, the native endpoint completed the tested Gemma 4 workflow in approximately one quarter of the time taken by the `/v1/chat/completions` path. That is a result from the tested model, prompt, and host configuration; it is not a general Ollama performance claim. The endpoint choice also avoids empty responses observed with Gemma 4 thinking mode and tracked in upstream Ollama issue [#15288](https://github.com/ollama/ollama/issues/15288).
- For `triava-prod`, leave the System Prompt field blank when you want to use the model's embedded adaptation layer.
- Prompts above roughly 2,000 characters reproduced an upstream empty-output issue in the tested Gemma 4 26B MoE configuration. See Ollama issue [#15428](https://github.com/ollama/ollama/issues/15428).

## License

MIT

Built by [Triava Labs](https://triavalabs.com).
