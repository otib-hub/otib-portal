'use server';

import { cookies, headers } from 'next/headers';
import { Locale, defaultLocale } from '@/i18n/config';

const HEADER_NAME = 'accept-language';
const COOKIE_NAME = 'user-locale';

export async function getUserLocale(): Promise<Locale> {
	const cookieStore = await cookies();
	const cookieLocale = cookieStore.get(COOKIE_NAME)?.value;

	if (cookieLocale && isValidLocale(cookieLocale)) {
		return cookieLocale as Locale;
	}

	const headerLocale = (
		(await headers()).get(HEADER_NAME)?.split(',')[0] || ''
	).toLowerCase();

	if (headerLocale.startsWith('pt')) return 'pt-BR';
	if (headerLocale.startsWith('en')) return 'en';
	if (headerLocale.startsWith('es')) return 'es';

	return defaultLocale;
}

export async function setUserLocale(locale: Locale) {
	const cookieStore = await cookies();
	cookieStore.set(COOKIE_NAME, locale, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365, // 1 year
	});
}

function isValidLocale(locale: string): locale is Locale {
	return ['en', 'pt-BR', 'es'].includes(locale);
}
