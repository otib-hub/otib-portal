import { isValidLocale } from '../is-valid-locale';

describe('isValidLocale() - unit tests', () => {
	it('validates existing locale', () => {
		expect(isValidLocale('pt-BR')).toBe(true);
	});

	it('invalidates unexistant locale', () => {
		expect(isValidLocale('en-UK')).toBe(false);
	});
});
