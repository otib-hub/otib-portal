export const locales = ['en', 'pt-BR', 'es'] as const;
export type Locale = (typeof locales)[number];

export const LocaleENUM = {
	en: 'en',
	ptBR: 'pt-BR',
	es: 'es',
} as const;

export const languages = [
	{
		title: '🇧🇷 Português',
		locale: LocaleENUM.ptBR,
	},
	{
		title: '🇺🇸 English',
		locale: LocaleENUM.en,
	},
	{
		title: '🇪🇸 Español',
		locale: LocaleENUM.es,
	},
];

export const defaultLocale: Locale = 'en';
