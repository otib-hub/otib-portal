'use server';

import { cookies, headers } from 'next/headers';
import { Locale, defaultLocale } from '@/i18n/config';
import { isValidLocale } from '@/utils/is-valid-locale';

const HEADER_NAME = 'accept-language';

export async function getUserLocale(): Promise<Locale> {
	const cookieStore = await cookies();
	const cookieLocale = cookieStore.get(process.env.LOCALE_COOKIE_NAME)?.value;

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
