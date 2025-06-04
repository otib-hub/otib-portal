import { NextResponse } from 'next/server';
import { CountriesPositionReponse } from '../../../../@types/external-api-responses/countries-now';

export async function GET() {
	try {
		const response = await fetch(
			`${process.env.COUNTRIESNOW_API_BASE_URL}/countries/positions`
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
