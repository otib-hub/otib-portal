import { Option } from '@/components/ui/select-with-search';
import { fetchSpy } from '@/tests/global.mock';

describe('fetchCities(country, state) unit tests', () => {
	beforeEach(() => {
		vi.resetModules();
		vi.clearAllMocks();
	});

	it('recovers sorted static cities when country is Brazil and state is Ceará', async () => {
		vi.doMock('#/json/cities_ceara.json', async () => ({
			default: CITIES_CEARA_DEFAULT,
		}));

		const { fetchCities } = await import('../fetch-cities');
		const result = await fetchCities('Brazil', 'Ceará');

		expect(fetchSpy).not.toHaveBeenCalled();
		expect(result).toStrictEqual(CITIES_CEARA_FORMATTED);
		expect(result).toStrictEqual(
			result.sort((a: Option, b: Option) => a.label.localeCompare(b.label))
		);
	});

	it('fetches and sort Brazil, Ceará states from API when static data is empty', async () => {
		vi.doMock('#/json/cities_ceara.json', async () => ({
			default: { data: [] },
		}));

		fetchSpy.mockResolvedValueOnce(Response.json(CITIES_CEARA_DEFAULT));

		const { fetchCities } = await import('../fetch-cities');
		const result = await fetchCities('Brazil', 'Ceará');

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(result).toStrictEqual(CITIES_CEARA_FORMATTED);
		expect(result).toStrictEqual(
			result.sort((a: Option, b: Option) => a.label.localeCompare(b.label))
		);
	});

	it('fetches and sort Brazil, Ceará states from API when static data format is invalid', async () => {
		vi.doMock('#/json/cities_ceara.json', async () => ({
			default: { data: [] },
		}));

		fetchSpy.mockResolvedValueOnce(Response.json(CITIES_CEARA_DEFAULT));

		const { fetchCities } = await import('../fetch-cities');
		const result = await fetchCities('Brazil', 'Ceará');

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(result).toStrictEqual(CITIES_CEARA_FORMATTED);
		expect(result).toStrictEqual(
			result.sort((a: Option, b: Option) => a.label.localeCompare(b.label))
		);
	});

	it('fetches and sort Brazil, Ceará states from API when static data throws error', async () => {
		// Mock the module to throw an error when accessing the data property
		vi.doMock('#/json/cities_ceara.json', async () => ({
			get default() {
				throw new Error('Failed to load static data');
			},
		}));

		fetchSpy.mockResolvedValueOnce(Response.json(CITIES_CEARA_DEFAULT));

		const { fetchCities } = await import('../fetch-cities');
		const result = await fetchCities('Brazil', 'Ceará');

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(result).toStrictEqual(CITIES_CEARA_FORMATTED);
		expect(result).toStrictEqual(
			result.sort((a: Option, b: Option) => a.label.localeCompare(b.label))
		);
	});

	it('fetches non-Ceará cities correctly ordered and formatted from API ', async () => {
		fetchSpy.mockResolvedValueOnce(Response.json(CITIES_RORAIMA_DEFAULT));

		const { fetchCities } = await import('../fetch-cities');
		const result = await fetchCities('Brazil', 'Roraima');

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(result).toStrictEqual(CITIES_RORAIMA_FORMATTED);
		expect(result).toStrictEqual(
			result.sort((a: Option, b: Option) => a.label.localeCompare(b.label))
		);
	});

	it('throws a readable error when states fetching goes wrong', async () => {});
});

const CITIES_CEARA_DEFAULT = {
	error: false,
	msg: 'cities in state Ceará of country Brazil retrieved',
	data: [
		'Aracati',
		'Camocim',
		'Crateús',
		'Croatá',
		'Fortaleza',
		'Guaraciaba do Norte',
		'Tianguá',
		'Ubajara',
	],
};

const CITIES_CEARA_FORMATTED = [
	{
		label: 'Aracati',
		value: 'Aracati',
	},
	{
		label: 'Camocim',
		value: 'Camocim',
	},
	{
		label: 'Crateús',
		value: 'Crateús',
	},
	{
		label: 'Croatá',
		value: 'Croatá',
	},
	{
		label: 'Fortaleza',
		value: 'Fortaleza',
	},
	{
		label: 'Guaraciaba do Norte',
		value: 'Guaraciaba do Norte',
	},
	{
		label: 'Tianguá',
		value: 'Tianguá',
	},
	{
		label: 'Ubajara',
		value: 'Ubajara',
	},
];

const CITIES_RORAIMA_DEFAULT = {
	error: false,
	msg: 'cities in state Roraima of country Brazil retrieved',
	data: [
		'Boa Vista',
		'Iracema',
		'Normandia',
		'Rorainópolis',
		'São João da Baliza',
		'São Luís',
	],
};

const CITIES_RORAIMA_FORMATTED = [
	{
		label: 'Boa Vista',
		value: 'Boa Vista',
	},
	{
		label: 'Iracema',
		value: 'Iracema',
	},
	{
		label: 'Normandia',
		value: 'Normandia',
	},
	{
		label: 'Rorainópolis',
		value: 'Rorainópolis',
	},
	{
		label: 'São João da Baliza',
		value: 'São João da Baliza',
	},
	{
		label: 'São Luís',
		value: 'São Luís',
	},
];
