import { getUserLocale } from '../get-user-locale';
import { defaultLocale } from '@/i18n/config';

import { cookies, headers } from 'next/headers';
import { isValidLocale } from '@/utils/is-valid-locale';

import {
	setupCookiesMock,
	setupHeadersMock,
	setupCookiesError,
	setupHeadersError,
} from '@/tests/next-headers.mock';

const mockCookies = vi.mocked(cookies);
const mockHeaders = vi.mocked(headers);
const mockIsValidLocale = vi.mocked(isValidLocale);

vi.mock('@/utils/is-valid-locale', () => ({
	isValidLocale: vi.fn(),
}));

describe('getUserLocale() unit tests', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		setupCookiesMock(mockCookies, undefined);
		setupHeadersMock(mockHeaders, null);
	});

	describe('when NEXT_LOCALE cookie exists and is valid', () => {
		it('returns locale from cookie', async () => {
			const mockCookieValue = 'pt-BR';
			setupCookiesMock(mockCookies, mockCookieValue);
			mockIsValidLocale.mockReturnValue(true);

			const result = await getUserLocale();

			expect(result).toBe(mockCookieValue);
			expect(mockCookies).toHaveBeenCalledTimes(1);
			expect(mockIsValidLocale).toHaveBeenCalledWith(mockCookieValue);
		});

		it('does not call headers when cookie is valid', async () => {
			setupCookiesMock(mockCookies, 'en');
			mockIsValidLocale.mockReturnValue(true);

			await getUserLocale();

			expect(mockHeaders).not.toHaveBeenCalled();
		});
	});

	describe('when cookie does not exist', () => {
		beforeEach(() => {
			setupCookiesMock(mockCookies, undefined);
		});

		it('gets accept-language header', async () => {
			setupHeadersMock(mockHeaders, 'pt-BR,pt;q=0.9,en;q=0.8');

			await getUserLocale();

			expect(mockHeaders).toHaveBeenCalledTimes(1);
		});

		it('returns PT-BR when header starts with "pt"', async () => {
			setupHeadersMock(mockHeaders, 'pt-BR,pt;q=0.9');

			const result = await getUserLocale();

			expect(result).toBe('pt-BR');
		});

		it('returns EN when header starts with "en"', async () => {
			setupHeadersMock(mockHeaders, 'en-US,en;q=0.9');

			const result = await getUserLocale();

			expect(result).toBe('en');
		});

		it('returns ES when header starts with "es"', async () => {
			setupHeadersMock(mockHeaders, 'es-ES,es;q=0.9');

			const result = await getUserLocale();

			expect(result).toBe('es');
		});

		it('is case insensitive with headers', async () => {
			setupHeadersMock(mockHeaders, 'PT-BR,pt;q=0.9');

			const result = await getUserLocale();

			expect(result).toBe('pt-BR');
		});
	});

	describe('when cookie exists but is invalid', () => {
		it('ignores invalid cookie and gets header', async () => {
			setupCookiesMock(mockCookies, 'invalid-locale');
			mockIsValidLocale.mockReturnValue(false);
			setupHeadersMock(mockHeaders, 'en-US,en;q=0.9');

			const result = await getUserLocale();

			expect(result).toBe('en');
			expect(mockIsValidLocale).toHaveBeenCalledWith('invalid-locale');
			expect(mockHeaders).toHaveBeenCalledTimes(1);
		});
	});

	describe('edge cases', () => {
		it('returns defaultLocale when header is null', async () => {
			setupCookiesMock(mockCookies, undefined);
			setupHeadersMock(mockHeaders, null);

			const result = await getUserLocale();

			expect(result).toBe(defaultLocale);
		});

		it('returns defaultLocale when header is empty string', async () => {
			setupCookiesMock(mockCookies, undefined);
			setupHeadersMock(mockHeaders, '');

			const result = await getUserLocale();

			expect(result).toBe(defaultLocale);
		});

		it('returns defaultLocale when header contain unsupported locale', async () => {
			setupCookiesMock(mockCookies, undefined);
			setupHeadersMock(mockHeaders, 'fr-FR,fr;q=0.9');

			const result = await getUserLocale();

			expect(result).toBe(defaultLocale);
		});

		it('handles header without commas as usual', async () => {
			setupCookiesMock(mockCookies, undefined);
			setupHeadersMock(mockHeaders, 'pt-BR');

			const result = await getUserLocale();

			expect(result).toBe('pt-BR');
		});
	});

	describe('error handling', () => {
		it('throws error when cookies throw error', async () => {
			setupCookiesError(mockCookies, new Error('Cookie error'));
			setupHeadersMock(mockHeaders, 'en-US');

			await expect(getUserLocale()).rejects.toThrow('Cookie error');
		});

		it('throws error when headers throw error', async () => {
			setupCookiesMock(mockCookies, undefined);
			setupHeadersError(mockHeaders, new Error('Header error'));

			await expect(getUserLocale()).rejects.toThrow('Header error');
		});
	});
});
