import { isValidLocale } from '@/utils/is-valid-locale';

vi.mock('@/utils/is-valid-locale', () => ({
	isValidLocale: vi.fn(),
}));

export const mockIsValidLocale = vi.mocked(isValidLocale);
