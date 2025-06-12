export function formatErrors(errorObj: Record<string, string[]>): string {
	return Object.entries(errorObj)
		.map(([field, messages]) => `${field}: ${messages.join(', ')}`)
		.join('\n');
}
