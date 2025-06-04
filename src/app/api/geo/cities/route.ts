import { NextResponse } from 'next/server';
import { CitiesInStateResponse } from '../../../../@types/external-api-responses/countries-now';

export async function POST(request: Request) {
	try {
		const { country, state } = await request.json();

		if (!country || !state) {
			return NextResponse.json(
				{ error: 'Country e state são obrigatórios' },
				{ status: 400 }
			);
		}

		const response = await fetch(
			`${process.env.COUNTRIESNOW_API_BASE_URL}/countries/state/cities`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ country, state }),
			}
		);

		const data: CitiesInStateResponse = await response.json();

		if (!data.data) {
			return NextResponse.json(
				{ error: 'Cidades não encontradas' },
				{ status: 404 }
			);
		}

		const cities: Record<string, string> = {};
		data.data.forEach((city: string) => {
			const key = city.toLowerCase().replace(/\s/g, '_');
			cities[key] = city;
		});

		return NextResponse.json(cities);
	} catch {
		return NextResponse.json(
			{ error: 'Erro ao obter cidades' },
			{ status: 500 }
		);
	}
}
