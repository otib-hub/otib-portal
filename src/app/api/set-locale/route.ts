import { isValidLocale } from '@/utils/is-valid-locale';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { locale } = await req.json();

		if (!isValidLocale(locale)) {
			return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
		}

		const response = NextResponse.json({ success: true });
		response.cookies.set(process.env.LOCALE_COOKIE_NAME, locale, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365, // 1 ano
			httpOnly: false, // permite acesso via client
			secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
			sameSite: 'lax', // Configuração de segurança
		});

		return response;
	} catch (error) {
		console.error('Erro ao definir locale:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
