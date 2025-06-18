export function formatErrors(error: unknown): string {
	if (!error) return 'Unknown error';

	if (typeof error === 'string') return error;

	if (Array.isArray(error)) {
		return error.join(', ');
	}

	if (typeof error === 'object' && error !== null) {
		const errObj = error as Record<string, unknown>;

		if (Array.isArray(errObj.message)) {
			return errObj.message.join(', ');
		}
		if (typeof errObj.message === 'string') {
			return errObj.message;
		}
		if (typeof errObj.detail === 'string') {
			return errObj.detail;
		}

		const fieldErrors = Object.entries(errObj)
			.map(([key, value]) => {
				if (Array.isArray(value)) return `${key}: ${value.join(', ')}`;
				if (typeof value === 'string') return `${key}: ${value}`;
				return `${key}: ${JSON.stringify(value)}`;
			})
			.join(' | ');

		return fieldErrors || 'Unexpected error format.';
	}

	return 'Unexpected error format.';
}
