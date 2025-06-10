import { State } from '@/@types/external-api-responses/locations';
import { Option } from '@/components/ui/select-with-search';

export async function fetchStates(countryName: string) {
	if (!countryName) {
		throw new Error('Country name is required');
	}

	try {
		const response = await fetch(
			'https://countriesnow.space/api/v0.1/countries/states',
			{
				method: 'POST',
				body: JSON.stringify({ country: countryName }),
				headers: { 'Content-Type': 'application/json' },
				mode: 'cors',
			}
		);

		if (!response.ok) {
			const responseBody = await response.json();
			throw new Error(`API Error [${response.status}]: ${responseBody.msg}`);
		}

		const data = await response.json();
		if (!data.data?.states) {
			throw new Error('Invalid API response format');
		}

		const states = data.data.states
			.map((state: State) => {
				return {
					label: state.name,
					value: state.state_code,
				};
			})
			.sort((a: Option, b: Option) => a.label.localeCompare(b.label));

		return states;
	} catch (err: unknown) {
		if (err instanceof Error) {
			const errorMsg = `Failed to fetch states: ${err.message}`;
			throw new Error(errorMsg);
		}

		const errorMsg = 'Unknown error getting state options';
		throw new Error(errorMsg);
	}
}
