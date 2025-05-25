export const locales = ['en', 'pt-BR', 'es'] as const;
export type Locale = (typeof locales)[number];
export const LocaleENUM = {
	en: 'en',
	ptBR: 'pt-BR',
	es: 'es',
} as const;
export const defaultLocale: Locale = 'en';
