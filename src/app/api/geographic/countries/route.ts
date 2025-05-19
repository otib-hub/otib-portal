import { NextResponse } from 'next/server';
import { CountriesPositionReponse } from '../../../../@types/external-api-responses/countries-now';

export async function GET() {
	try {
		const response = await fetch(
			'https://countriesnow.space/api/v0.1/countries/positions'
		);
		const data: CountriesPositionReponse = await response.json();

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
