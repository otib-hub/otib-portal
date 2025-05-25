import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '../services/get-user-locale';

export default getRequestConfig(async () => {
	const locale = await getUserLocale();
	return {
		locale,
		messages: (await import(`../../public/locales/${locale}.json`)).default,
	};
});
