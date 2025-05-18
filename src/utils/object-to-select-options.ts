export function objectToSelectOptions<T extends Record<string, string>>(
	options: T
) {
	return Object.entries(options).map(([value, label]) => ({ value, label }));
}
