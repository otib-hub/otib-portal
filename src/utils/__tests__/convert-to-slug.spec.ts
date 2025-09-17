import { convertToSlug } from '../convert-to-slug';

describe('convertToSlug() = unit tests', () => {
	it('should convert simple text to slug', () => {
		expect(convertToSlug('Hello World')).toBe('hello-world');
	});

	it('should trim extra spaces and normalize', () => {
		expect(convertToSlug('   Hello   World   ')).toBe('hello-world');
	});

	it('should convert uppercase letters to lowercase', () => {
		expect(convertToSlug('HeLLo WoRLD')).toBe('hello-world');
	});

	it.each([
		['ação rápida', 'acao-rapida'],
		['coração', 'coracao'],
		['mañana', 'manana'],
		['über', 'uber'],
	])('should replace accented characters: %s → %s', (input, expected) => {
		expect(convertToSlug(input)).toBe(expected);
	});

	it("should replace '&' with '-and-'", () => {
		expect(convertToSlug('rock & roll')).toBe('rock-and-roll');
	});

	it.each([
		['hello@world!', 'hello-world-'],
		['foo_bar', 'foo-bar'],
		['lorem/ipsum', 'lorem-ipsum'],
	])('should remove special characters: %s → %s', (input, expected) => {
		expect(convertToSlug(input)).toBe(expected);
	});

	it.each([
		['hello---world', 'hello-world'],
		['hello   ---   world', 'hello-world'],
	])('should collapse multiple hyphens: %s → %s', (input, expected) => {
		expect(convertToSlug(input)).toBe(expected);
	});

	it('should handle empty string', () => {
		expect(convertToSlug('')).toBe('');
	});

	it('should leave already valid slug unchanged', () => {
		expect(convertToSlug('simple-slug')).toBe('simple-slug');
	});

	it.each([
		['œuf æon ÿ', 'ouf-aon-y'],
		['ŕśńṕẃǵ', 'rsnpwg'],
	])(
		'should handle special mapped characters: %s → %s',
		(input, expected) => {
			expect(convertToSlug(input)).toBe(expected);
		},
	);
});
