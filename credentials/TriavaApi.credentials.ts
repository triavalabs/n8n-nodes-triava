import {
	type IAuthenticateGeneric,
	type ICredentialTestRequest,
	type ICredentialType,
	type INodeProperties,
} from 'n8n-workflow';

export class TriavaApi implements ICredentialType {
	name = 'triavaApi';
	displayName = 'Triava API';
	documentationUrl = 'https://github.com/triavalabs/n8n-nodes-triava';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.triavalabs.com',
			required: true,
			description: 'The base URL of your Triava/Ollama endpoint (without trailing slash)',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'API key for authentication (leave blank if endpoint does not require auth)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.apiKey ? "Bearer " + $credentials.apiKey : ""}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/models',
			method: 'GET',
		},
	};
}
