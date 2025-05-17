import { NextResponse } from 'next/server';

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
			'https://countriesnow.space/api/v0.1/countries/state/cities',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ country, state }),
			}
		);

		const data = await response.json();

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
