import { mockIsValidLocale } from '@/tests/utils.mock';
import { mockCookies } from '@/tests/js-cookie.mock';
import { mockConsoleError } from '@/tests/console.mock';
import { handleLocaleChange } from '../handle-locale-change';

const mockLocationReload = vi.fn();

// mock window.location.reload
Object.defineProperty(window, 'location', {
	value: { reload: mockLocationReload },
	writable: true,
	configurable: true,
});

describe('handleLocaleChange() unit tests', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockIsValidLocale.mockReturnValue(true);
	});

	describe('when called with a valid locale', () => {
		it('sets the NEXT_LOCALE cookie with the provided locale', () => {
			const locale = 'pt-BR';

			handleLocaleChange(locale);

			expect(mockIsValidLocale).toHaveBeenCalledWith(locale);
			expect(mockCookies.set).toHaveBeenCalledWith('NEXT_LOCALE', locale, {
				expires: 30,
			});
		});

		it('sets cookie with 30 days expiration', () => {
			const locale = 'en';

			handleLocaleChange(locale);

			expect(mockIsValidLocale).toHaveBeenCalledWith(locale);
			expect(mockCookies.set).toHaveBeenCalledWith('NEXT_LOCALE', locale, {
				expires: 30,
			});
		});

		it('reloads the page after setting the cookie', () => {
			const locale = 'es';

			handleLocaleChange(locale);

			expect(mockIsValidLocale).toHaveBeenCalledWith(locale);
			expect(mockLocationReload).toHaveBeenCalledTimes(1);
		});

		it('works with different locale values', () => {
			const locales = ['pt-BR', 'en', 'es'] as const;

			locales.forEach((locale) => {
				vi.clearAllMocks();
				mockIsValidLocale.mockReturnValue(true);

				handleLocaleChange(locale);

				expect(mockIsValidLocale).toHaveBeenCalledWith(locale);
				expect(mockCookies.set).toHaveBeenCalledWith('NEXT_LOCALE', locale, {
					expires: 30,
				});
				expect(mockLocationReload).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe('when called with an invalid locale', () => {
		it('does not set cookie or reload page when locale is invalid', () => {
			const locale = 'invalid-locale';
			mockIsValidLocale.mockReturnValue(false);

			handleLocaleChange(locale);

			expect(mockIsValidLocale).toHaveBeenCalledWith(locale);
			expect(mockCookies.set).not.toHaveBeenCalled();
			expect(mockLocationReload).not.toHaveBeenCalled();
		});

		it('logs error to console when locale is invalid', () => {
			const locale = 'invalid-locale';
			mockIsValidLocale.mockReturnValue(false);

			handleLocaleChange(locale);

			expect(mockConsoleError).toHaveBeenCalledWith(
				new Error('Invalid locale')
			);
		});

		it('handles empty string locale as invalid', () => {
			const locale = '';
			mockIsValidLocale.mockReturnValue(false);

			handleLocaleChange(locale);

			expect(mockIsValidLocale).toHaveBeenCalledWith(locale);
			expect(mockCookies.set).not.toHaveBeenCalled();
			expect(mockLocationReload).not.toHaveBeenCalled();
			expect(mockConsoleError).toHaveBeenCalledWith(
				new Error('Invalid locale')
			);
		});

		it('handles locale with special characters as invalid', () => {
			const locale = 'pt-BR-UTF8';
			mockIsValidLocale.mockReturnValue(false);

			handleLocaleChange(locale);

			expect(mockIsValidLocale).toHaveBeenCalledWith(locale);
			expect(mockCookies.set).not.toHaveBeenCalled();
			expect(mockLocationReload).not.toHaveBeenCalled();
			expect(mockConsoleError).toHaveBeenCalledWith(
				new Error('Invalid locale')
			);
		});
	});

	describe('error handling', () => {
		it('catches and logs cookie setting errors', () => {
			const locale = 'pt-BR';
			const error = new Error('Cookie setting failed');
			mockCookies.set.mockImplementation(() => {
				throw error;
			});

			handleLocaleChange(locale);

			expect(mockIsValidLocale).toHaveBeenCalledWith(locale);
			expect(mockCookies.set).toHaveBeenCalledWith('NEXT_LOCALE', locale, {
				expires: 30,
			});
			expect(mockLocationReload).not.toHaveBeenCalled();
			expect(mockConsoleError).toHaveBeenCalledWith(error);
		});
	});
});
