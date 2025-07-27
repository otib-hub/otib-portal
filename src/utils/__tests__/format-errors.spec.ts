import { formatErrors } from '../format-errors';

describe('formatErrors() - unit tests', () => {
	describe('primitive error types', () => {
		it('should return unknown error if error is undefined', () => {
			const result = formatErrors(undefined);
			expect(result).toBe('Unknown error');
		});

		it('should return a string if error is already one', () => {
			const result = formatErrors('error-string');
			expect(result).toBe('error-string');
		});

		it('should return a string separated with commas if error is an array', () => {
			const result = formatErrors(['error', 'array', 'format']);
			expect(result).toBe('error, array, format');
		});
	});

	describe('object-composed error', () => {
		it('should return a string separated with commas if error is an object with message key containing an array of strings', () => {
			const result = formatErrors({ message: ['error', 'array', 'format'] });
			expect(result).toBe('error, array, format');
		});

		it('should return a string when object.message or object.detail contain one', () => {
			const messageResult = formatErrors({ message: 'error-message-any' });
			expect(messageResult).toBe('error-message-any');

			const detailResult = formatErrors({ detail: 'error-detail-any' });
			expect(detailResult).toBe('error-detail-any');
		});

		it('should return a string separated with pipes when error is an object with unknown or field-specific keys', () => {
			const error = {
				fieldOne: ['fieldOne', 'error', 'case'],
				fieldTwo: 'fieldTwo error case',
				fieldThree: {
					field: 'three',
				},
			};

			const result = formatErrors(error);
			expect(result).toStrictEqual(
				'fieldOne: fieldOne, error, case | fieldTwo: fieldTwo error case | fieldThree: {"field":"three"}'
			);
		});
	});

	describe('unexpected error formats', () => {
		it('should return "Unexpected error format." if error is a number', () => {
			const result = formatErrors(123);
			expect(result).toBe('Unexpected error format.');
		});

		it('should return "Unexpected error format." if error is a boolean', () => {
			const result = formatErrors(true);
			expect(result).toBe('Unexpected error format.');
		});

		it('should return "Unexpected error format." if error is a symbol', () => {
			const result = formatErrors(Symbol('error'));
			expect(result).toBe('Unexpected error format.');
		});

		it('should return "Unexpected error format." if error is a function', () => {
			const result = formatErrors(() => 'error');
			expect(result).toBe('Unexpected error format.');
		});
	});
});
