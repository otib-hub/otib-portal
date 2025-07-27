import { Country } from '@/@types/external-api-responses/locations';
import { Option } from '@/components/ui/select-with-search';
import countries_static from '#/json/countries.json';

export async function fetchCountries(): Promise<Option[]> {
	try {
		let countriesData: Country[] | [];

		// tenta recuperar paises localmente
		if (
			Array.isArray(countries_static?.data) &&
			countries_static.data.length > 0
		) {
			countriesData = countries_static.data;
		} else {
			// fallback, chama api externa
			const response = await fetch(
				'https://countriesnow.space/api/v0.1/countries/flag/unicode'
			);

			if (!response.ok) {
				const responseBody = await response.json();
				throw new Error(`API Error [${response.status}]: ${responseBody.msg}`);
			}

			const data = await response.json();

			if (!Array.isArray(data.data)) {
				throw new Error('Invalid API response format');
			}

			countriesData = data.data;
		}

		const countries = countriesData
			.map((country: Country) => {
				const countryFlag = country.unicodeFlag || '🇦🇦';

				return {
					label: `${countryFlag} ${country.name}`,
					value: country.name,
				};
			})
			.sort((a: Option, b: Option) => a.value.localeCompare(b.value));

		// coloca o Brasil no topo, se existir
		const indexBRA = countries.findIndex((c) => c.value === 'Brazil');

		if (indexBRA !== -1) {
			countries[indexBRA].label = '🇧🇷 Brasil';
			const [braCountry] = countries.splice(indexBRA, 1);
			countries.unshift(braCountry);
		}

		return countries;
	} catch (err: unknown) {
		if (err instanceof Error) {
			throw new Error(`Failed to fetch countries: ${err.message}`);
		}
		throw new Error('Unknown error getting country options');
	}
}
