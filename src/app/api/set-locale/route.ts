import { locales } from '@/i18n/config';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'user-locale';

export async function POST(req: NextRequest) {
	const { locale } = await req.json();

	if (!locales.includes(locale)) {
		return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
	}

	const response = NextResponse.json({ success: true });
	response.cookies.set(COOKIE_NAME, locale, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365,
	});

	return response;
}
