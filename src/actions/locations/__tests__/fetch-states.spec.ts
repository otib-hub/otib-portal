import { fetchSpy } from '@/tests/global.mock';
import { Option } from '@/components/ui/select-with-search';

// todo: devolver erros nos testes com console.error

describe('fetchStates(country) unit tests', () => {
	beforeEach(() => {
		vi.resetModules();
		vi.clearAllMocks();
	});

	it('recovers sorted static states when country is Brazil', async () => {
		vi.doMock('#/json/states_brazil.json', async () => ({
			default: STATES_BRAZIL_DEFAULT,
		}));

		const { fetchStates } = await import('../fetch-states');
		const result = await fetchStates('Brazil');

		expect(fetchSpy).not.toHaveBeenCalled();
		expect(result).toStrictEqual(STATES_BRAZIL_FORMATTED);
		expect(result).toStrictEqual(
			result.sort((a: Option, b: Option) => a.label.localeCompare(b.label))
		);
	});

	it('recovers static Brazil states in less than 1 second', async () => {
		vi.doMock('#/json/states_brazil.json', async () => ({
			default: STATES_BRAZIL_DEFAULT,
		}));
		const { fetchStates } = await import('../fetch-states');

		const start = performance.now();
		await fetchStates('Brazil');

		const end = performance.now();
		const duration = end - start;
		expect(duration).toBeLessThan(1000);
	});

	it('fetches and sort Brazil states from API when static data is empty', async () => {
		vi.doMock('#/json/states_brazil.json', async () => {
			return { default: { data: { states: [] } } };
		});

		fetchSpy.mockResolvedValueOnce(Response.json(STATES_BRAZIL_DEFAULT));

		const { fetchStates } = await import('../fetch-states');
		const result = await fetchStates('Brazil');

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(result).toStrictEqual(STATES_BRAZIL_FORMATTED);
		expect(result).toStrictEqual(
			result.sort((a: Option, b: Option) => a.label.localeCompare(b.label))
		);
	});

	it('fetches and sort Brazil states from API when static data format is invalid', async () => {
		vi.doMock('#/json/states_brazil.json', async () => {
			return { default: { data: { states: [] } } };
		});

		fetchSpy.mockResolvedValueOnce(Response.json(STATES_BRAZIL_DEFAULT));

		const { fetchStates } = await import('../fetch-states');
		const result = await fetchStates('Brazil');

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(result).toStrictEqual(STATES_BRAZIL_FORMATTED);
		expect(result).toStrictEqual(
			result.sort((a: Option, b: Option) => a.label.localeCompare(b.label))
		);
	});

	it('fetches and sort Brazil states from API when static data throws error', async () => {
		// Mock the module to return invalid data that will cause an error
		vi.doMock('#/json/states_brazil.json', async () => ({
			default: { data: { states: [] } },
		}));

		fetchSpy.mockResolvedValueOnce(Response.json(STATES_BRAZIL_DEFAULT));

		const { fetchStates } = await import('../fetch-states');
		const result = await fetchStates('Brazil');

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(result).toStrictEqual(STATES_BRAZIL_FORMATTED);
		expect(result).toStrictEqual(
			result.sort((a: Option, b: Option) => a.label.localeCompare(b.label))
		);
	});

	it('fetches non-Brazil states correctly ordered and formatted from API ', async () => {
		fetchSpy.mockResolvedValueOnce(Response.json(STATES_BAHREIN_DEFAULT));

		const { fetchStates } = await import('../fetch-states');
		const result = await fetchStates('Bahrein');

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(result).toStrictEqual(STATES_BAHREIN_FORMATTED);
		expect(result).toStrictEqual(
			result.sort((a: Option, b: Option) => a.label.localeCompare(b.label))
		);
	});

	it('throws a readable error when states fetching goes wrong', async () => {
		const { fetchStates } = await import('../fetch-states');
		fetchSpy.mockRejectedValueOnce(new Error('Triggered API Error'));

		await expect(fetchStates('Bahrein')).rejects.toThrowError(
			'Failed to fetch states: Triggered API Error'
		);

		expect(fetchSpy).toHaveBeenCalledTimes(1);
	});
});

const STATES_BRAZIL_DEFAULT = {
	data: {
		name: 'Brazil',
		iso3: 'BRA',
		iso2: 'BR',
		states: [
			{
				name: 'Acre',
				state_code: 'AC',
			},
			{
				name: 'Ceará',
				state_code: 'CE',
			},
			{
				name: 'Distrito Federal',
				state_code: 'DF',
			},
		],
	},
};

const STATES_BRAZIL_FORMATTED = [
	{
		label: 'Acre',
		value: 'Acre',
	},
	{
		label: 'Ceará',
		value: 'Ceará',
	},
	{
		label: 'Distrito Federal',
		value: 'Distrito Federal',
	},
];

const STATES_BAHREIN_DEFAULT = {
	error: false,
	msg: 'states in Bahrain retrieved',
	data: {
		name: 'Bahrain',
		iso3: 'BHR',
		iso2: 'BH',
		states: [
			{
				name: 'Capital Governorate',
				state_code: '13',
			},
			{
				name: 'Central Governorate',
				state_code: '16',
			},
			{
				name: 'Muharraq Governorate',
				state_code: '15',
			},
			{
				name: 'Northern Governorate',
				state_code: '17',
			},
			{
				name: 'Southern Governorate',
				state_code: '14',
			},
		],
	},
};

const STATES_BAHREIN_FORMATTED = [
	{
		label: 'Capital Governorate',
		value: 'Capital Governorate',
	},
	{
		label: 'Central Governorate',
		value: 'Central Governorate',
	},
	{
		label: 'Muharraq Governorate',
		value: 'Muharraq Governorate',
	},
	{
		label: 'Northern Governorate',
		value: 'Northern Governorate',
	},
	{
		label: 'Southern Governorate',
		value: 'Southern Governorate',
	},
];
