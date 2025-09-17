import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
	try {
		let data;
		try {
			data = await req.json();
		} catch {
			return NextResponse.json({
				success: false,
				status: 400,
				message: 'Invalid JSON data in request body',
			});
		}

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/pesquisa-completa/`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			},
		);

		let json;

		try {
			json = await res.json();
		} catch {
			json = {
				detail: 'Unexpected error while interpreting backend response.',
			};
		}

		if (!res.ok) {
			return NextResponse.json({
				success: false,
				status: res.status,
				message:
					json?.detail ||
					'Unexpected error while processing the request.',
				data: json,
			});
		}

		return NextResponse.json({
			success: true,
			status: res.status,
			data: json,
		});
	} catch (err: unknown) {
		return NextResponse.json({
			success: false,
			status: 500,
			message:
				err instanceof Error ? err.message : 'Internal server error.',
		});
	}
}
