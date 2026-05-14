import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

export class Triava implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Triava',
		name: 'triava',
		icon: { light: 'file:triava.svg', dark: 'file:triava.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["model"]}}',
		description: 'Text generation with self-hosted Gemma 4 models via Triava sovereign endpoints',
		defaults: {
			name: 'Triava',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'triavaApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Model',
				name: 'model',
				type: 'string',
				default: 'triava-prod:latest',
				required: true,
				description: 'Model identifier (e.g. triava-prod:latest, gemma4:26b, gemma4:e4b)',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				required: true,
				description: 'The user message to send to the model',
			},
			{
				displayName: 'System Prompt',
				name: 'systemPrompt',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Optional system prompt to guide model behavior',
			},
			{
				displayName: 'Max Tokens',
				name: 'maxTokens',
				type: 'number',
				default: 2048,
				description: 'Maximum number of tokens to generate in the response',
			},
			{
				displayName: 'Temperature',
				name: 'temperature',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 2,
					numberPrecision: 2,
				},
				default: 0.7,
				description: 'Sampling temperature (0 = deterministic, 2 = very random)',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'hidden',
				default: 'generate',
				routing: {
					request: {
						method: 'POST',
						url: '/api/generate',
						body: {
							model: '={{$parameter["model"]}}',
							prompt: '={{$parameter["message"]}}',
							system: '={{$parameter["systemPrompt"]}}',
							stream: false,
							options: {
								num_predict: '={{$parameter["maxTokens"]}}',
								temperature: '={{$parameter["temperature"]}}',
							},
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'response',
								},
							},
						],
					},
				},
			},
		],
	};
}
