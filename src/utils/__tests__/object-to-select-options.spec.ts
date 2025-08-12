import { objectToSelectOptions } from '../object-to-select-options';

describe('objectToSelectOptions() - unit tests', () => {
	it('should return a valid option array', () => {
		const object = {
			1: 'Foo',
			2: 'Bar',
			3: 'Acme',
		};

		const result = objectToSelectOptions(object);

		expect(result).toStrictEqual([
			{
				value: '1',
				label: 'Foo',
			},
			{
				value: '2',
				label: 'Bar',
			},
			{
				value: '3',
				label: 'Acme',
			},
		]);
	});
});
