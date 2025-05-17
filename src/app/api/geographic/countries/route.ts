import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const response = await fetch(
			'https://countriesnow.space/api/v0.1/countries/positions'
		);
		const data = await response.json();

		const countries: Record<string, string> = {};

		data.data.forEach((item) => {
			countries[item.iso2.toLowerCase()] = item.name;
		});

		return NextResponse.json(countries);
	} catch {
		return NextResponse.json(
			{ error: 'Erro ao obter países' },
			{ status: 500 }
		);
	}
}
