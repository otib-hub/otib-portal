export function objectToSelectOptions<
	T extends Record<string | number, string>
>(options: T) {
	return Object.entries(options).map(([value, label]) => ({
		value: value.toString(),
		label: label.toString(),
	}));
}
