'use server';

import { City } from '@/@types/external-api-responses/locations';
import { Option } from '@/components/ui/select-with-search';

export async function fetchCities(countryName: string, stateName: string) {
	if (!countryName) {
		throw new Error('Country name is required');
	}

	if (!stateName) {
		throw new Error('State name is required');
	}

	try {
		const response = await fetch(
			'https://countriesnow.space/api/v0.1/countries/state/cities',
			{
				method: 'POST',
				body: JSON.stringify({ country: countryName, state: stateName }),
				headers: { 'Content-Type': 'application/json' },
				mode: 'cors',
			}
		);

		if (!response.ok) {
			const responseBody = await response.json();
			throw new Error(`API Error [${response.status}]: ${responseBody.msg}`);
		}

		const data = await response.json();
		if (!data.data) {
			throw new Error('Invalid API response format');
		}

		const cities = data.data
			.map((city: City) => {
				return {
					label: city,
					value: city,
				};
			})
			.sort((a: Option, b: Option) => a.label.localeCompare(b.label));

		return cities;
	} catch (err: unknown) {
		if (err instanceof Error) {
			const errorMsg = `Failed to fetch cities: ${err.message}`;
			throw new Error(errorMsg);
		}

		const errorMsg = 'Unknown error getting city options';
		throw new Error(errorMsg);
	}
}
