import { Locale, locales } from '@/i18n/config';

export function isValidLocale(locale: string): locale is Locale {
	return locales.includes(locale as Locale);
}
