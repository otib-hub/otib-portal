import { routing } from '@/i18n/routing';
import { formats } from '@/i18n/request';
import messages from '#/locales/en.json';

declare module 'next-intl' {
	interface AppConfig {
		Locale: (typeof routing.locales)[number];
		Messages: typeof messages;
		Formats: typeof formats;
	}
}

export type TFunction<T = string> = typeof ReturnType<
	typeof useTranslations<T>
>;
