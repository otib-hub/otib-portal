'use server';

import { cookies, headers } from 'next/headers';
import { Locale, defaultLocale } from '@/i18n/config';
import { isValidLocale } from '@/utils/is-valid-locale';

export async function getUserLocale(): Promise<Locale> {
	const cookieLocale = (await cookies()).get('NEXT_LOCALE')?.value;

	if (cookieLocale && isValidLocale(cookieLocale)) {
		return cookieLocale as Locale;
	}

	const headerLocale = (
		(await headers()).get('accept-language')?.split(',')[0] || ''
	).toLowerCase();

	if (headerLocale.startsWith('pt')) return 'pt-BR';
	if (headerLocale.startsWith('en')) return 'en';
	if (headerLocale.startsWith('es')) return 'es';

	return defaultLocale;
}
