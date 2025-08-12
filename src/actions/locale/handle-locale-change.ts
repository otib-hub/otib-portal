import { Locale } from 'next-intl';
import Cookies from 'js-cookie';
import { isValidLocale } from '@/utils/is-valid-locale';

export function handleLocaleChange(locale: Locale) {
	try {
		if (!isValidLocale(locale)) throw new Error('Invalid locale');
		Cookies.set('NEXT_LOCALE', locale, { expires: 30 });
		window.location.reload();
	} catch (error) {
		console.error(error);
	}
}
