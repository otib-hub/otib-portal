'use server';

import { Country } from '@/@types/external-api-responses/locations';
import { Option } from '@/components/ui/select-with-search';

export async function fetchCountries() {
	try {
		const response = await fetch(
			'https://countriesnow.space/api/v0.1/countries/flag/unicode/'
		);

		if (!response.ok) {
			const responseBody = await response.json();
			throw new Error(`API Error [${response.status}]: ${responseBody.msg}`);
		}

		const data = await response.json();
		if (!data.data) {
			throw new Error('Invalid API response format');
		}

		const countries = data.data
			.map((country: Country) => {
				return {
					label: country.name,
					value: country.iso3,
				};
			})
			.sort((a: Option, b: Option) => a.label.localeCompare(b.label));

		// coloca a opção "Brasil" como a primeira do array
		const indexBRA = countries.findIndex((c: Option) => c.value === 'BRA');
		const [braCountry] = countries.splice(indexBRA, 1);
		countries.unshift(braCountry);

		return countries;
	} catch (err: unknown) {
		if (err instanceof Error) {
			const errorMsg = `Failed to fetch countries ${err.message}`;
			throw new Error(errorMsg);
		}

		const errorMsg = 'Unknown error getting country options';
		throw new Error(errorMsg);
	}
}
