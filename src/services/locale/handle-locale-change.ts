import { Locale } from 'next-intl';
import Cookies from 'js-cookie';

export function handleLocaleChange(locale: Locale) {
	Cookies.set('NEXT_LOCALE', locale, { expires: 30 });
	window.location.reload();
}
