'use server';

import { headers } from 'next/headers';
import { Locale, defaultLocale } from '@/i18n/config';

const HEADER_NAME = 'accept-language';

export async function getUserLocale() {
	const locale = (await headers()).get(HEADER_NAME)?.split(',')[0];

	if (!locale) return defaultLocale;
	if (locale.startsWith('pt')) return 'pt-BR';
	if (locale.startsWith('en')) return 'en';
	if (locale.startsWith('es')) return 'es';
}

export async function setUserLocale(locale: Locale) {
	(await headers()).set(HEADER_NAME, locale);
}
