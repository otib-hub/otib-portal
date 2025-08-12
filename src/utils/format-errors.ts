export function formatErrors(error: unknown): string {
	if (!error) return 'Unknown error';

	switch (typeof error) {
		case 'string':
			return error;
		case 'object':
			return formatErrorObject(error);
		default:
			return 'Unexpected error format.';
	}
}

function formatErrorObject(error: unknown): string {
	if (Array.isArray(error)) return error.join(', ');

	const errObj = error as Record<string, unknown>;
	const message = errObj.message ?? undefined;
	const detail = errObj.detail ?? undefined;

	// checa se o erro contém message ou detail
	if (message) return formatErrorObjectKey(errObj, 'message');
	if (detail) return formatErrorObjectKey(errObj, 'detail');

	// caso contrário, verifica se o erro contém fieldErrors
	const fieldErrors = formatFieldErrors(errObj);

	return fieldErrors || 'Unexpected error format.';
}

function formatErrorObjectKey(error: unknown, key: string): string {
	const errObj = error as Record<string, unknown>;

	if (!errObj[key]) return '';

	// verifica se o erro contém um array
	if (Array.isArray(errObj[key])) {
		return errObj[key].join(', ');
	}

	// caso contrário, verifica se o erro contém uma string
	if (typeof errObj[key] === 'string') {
		return errObj[key];
	}

	return 'Unexpected error format.';
}

function formatFieldErrors(fieldErrors: Record<string, unknown>): string {
	return Object.entries(fieldErrors)
		.map(([key, value]) => {
			// verifica se o erro contém um array
			if (Array.isArray(value)) return `${key}: ${value.join(', ')}`;

			// caso contrário, verifica se o erro contém uma string
			if (typeof value === 'string') return `${key}: ${value}`;

			// caso contrário, retorna o erro formatado
			return `${key}: ${JSON.stringify(value)}`;
		})
		.join(' | '); // junta os erros formatados com pipes
}
