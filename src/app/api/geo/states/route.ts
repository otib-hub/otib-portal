import { NextResponse } from 'next/server';
import { CountryStatesResponse } from '../../../../@types/external-api-responses/countries-now';

export async function POST(request: Request) {
	try {
		const { country } = await request.json();
		if (!country) {
			return NextResponse.json(
				{ error: 'Country é obrigatório' },
				{ status: 400 }
			);
		}

		const response = await fetch(
			`${process.env.COUNTRIESNOW_API_BASE_URL}/countries/states`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ country }),
			}
		);

		const data: CountryStatesResponse = await response.json();
		if (!data.data?.states) {
			return NextResponse.json(
				{ error: 'Estados não encontrados' },
				{ status: 404 }
			);
		}

		const states: Record<string, string> = {};

		for (const state of data.data.states) {
			states[state.name] = state.name;
		}

		return NextResponse.json(states);
	} catch {
		return NextResponse.json(
			{ error: 'Erro ao obter estados' },
			{ status: 500 }
		);
	}
}
