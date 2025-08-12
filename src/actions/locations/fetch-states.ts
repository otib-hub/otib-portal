import { State } from '@/@types/external-api-responses/locations';
import { Option } from '@/components/ui/select-with-search';
import states_brazil_static from '#/json/states_brazil.json';

export async function fetchStates(countryName: string) {
	if (!countryName) {
		throw new Error('Country name is required');
	}

	// tenta recuperar os estados do Brasil localmente
	if (countryName === 'Brazil') {
		try {
			if (
				!states_brazil_static?.data.states ||
				!Array.isArray(states_brazil_static?.data.states)
			) {
				throw new Error('Invalid static data format');
			}

			// verifica se há dados disponíveis
			if (states_brazil_static?.data.states.length === 0) {
				throw new Error('Static data is empty');
			}

			const states = states_brazil_static.data.states
				.map((state: State) => {
					return {
						label: state.name,
						value: state.name,
					};
				})
				.sort((a: Option, b: Option) => a.label.localeCompare(b.label));

			return states;
		} catch (error) {
			if (error instanceof Error)
				console.warn(
					'Failed to load static states data, falling back to API: ' +
						error.message
				);
		}
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
					value: state.name,
				};
			})
			.sort((a: Option, b: Option) => a.label.localeCompare(b.label));

		return states;
	} catch (err: unknown) {
		let errorMsg;

		if (err instanceof Error) {
			errorMsg = `Failed to fetch states: ${err.message}`;
			console.error(errorMsg);
			throw new Error(errorMsg);
		}

		errorMsg = 'Unknown error getting state options';
		console.error(errorMsg);
		throw new Error(errorMsg);
	}
}
