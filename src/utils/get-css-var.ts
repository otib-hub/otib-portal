export function getCSSVar(name: string, fallback = ''): string {
	if (typeof window === 'undefined') return fallback; // evita erro no SSR
	const value = getComputedStyle(document.documentElement)
		.getPropertyValue(name)
		.trim();
	return value || fallback;
}
