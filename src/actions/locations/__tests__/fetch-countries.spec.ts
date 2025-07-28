import { fetchSpy } from '@/tests/global.mock';
import { COUNTRIES_DEFAULT, COUNTRIES_FORMATTED, DATA_EMPTY } from './mocks';

describe('fetchCountries() unit tests', () => {
	beforeEach(() => {
		// overwrites json (module) import
		vi.resetModules();
	});

	it('recovers sorted static countries as default', async () => {
		// mocks json to return default countries
		vi.doMock('#/json/countries.json', () => ({
			default: COUNTRIES_DEFAULT,
		}));

		// import fetch function dynamically to have spy effect
		const { fetchCountries } = await import('../fetch-countries');
		const result = await fetchCountries();

		expect(fetchSpy).not.toHaveBeenCalled();
		expect(result).toStrictEqual(COUNTRIES_FORMATTED);
		expect(result).toStrictEqual(
			result.sort((a, b) => a.label.localeCompare(b.label))
		);
	});

	it('recovers static countries in less than 1 second', async () => {
		vi.doMock('#/json/countries.json', () => ({ default: COUNTRIES_DEFAULT }));
		const { fetchCountries } = await import('../fetch-countries');

		const start = performance.now();
		await fetchCountries();

		const end = performance.now();
		const duration = end - start;

		expect(duration).toBeLessThan(1000);
	});

	it("arranges Brasil in array's first position", async () => {
		// mocks json to return default countries
		vi.doMock('#/json/countries.json', () => ({
			default: COUNTRIES_DEFAULT,
		}));

		// import fetch function dynamically to have spy effect
		const { fetchCountries } = await import('../fetch-countries');
		const result = await fetchCountries();

		expect(result[0]).toStrictEqual({
			label: '🇧🇷 Brasil',
			value: 'Brazil',
		});
	});

	it('fetches and sort countries from API when static data is empty or cant be resolved', async () => {
		// mocks json to return empty countries
		vi.doMock('#/json/countries.json', () => {
			return { default: { data: DATA_EMPTY } };
		});

		// mocks fetch function to return default countries
		fetchSpy.mockResolvedValueOnce(Response.json(COUNTRIES_DEFAULT));

		const { fetchCountries } = await import('../fetch-countries');
		const result = await fetchCountries();

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(result).toStrictEqual(COUNTRIES_FORMATTED);
		expect(result).toStrictEqual(
			result.sort((a, b) => a.label.localeCompare(b.label))
		);
	});

	it('throws a readable error when countries fetching goes wrong', async () => {
		const { fetchCountries } = await import('../fetch-countries');
		fetchSpy.mockRejectedValueOnce(new Error('Triggered API Error'));

		await expect(fetchCountries()).rejects.toThrowError(
			'Failed to fetch countries: Triggered API Error'
		);

		expect(fetchSpy).toHaveBeenCalledTimes(1);
	});
});
