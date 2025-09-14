import Header from '@/components/layout/Header';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/providers/ThemeProvider';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { inter } from '@/styles/fonts';
import '@/styles/globals.css';
import QueryProvider from '@/providers/QueryProvider';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
	title: 'Observatório do Turismo da Ibiapaba - OTIB',
	description:
		'Promovendo inovação e monitoramento sustentável do turismo na região da Ibiapaba."',
	keywords: [
		'OTIB',
		'Observatório de Turismo da Ibiapaba',
		'Observatório de Turismo',
		'Ibiapaba',
		'Serra da Ibiapaba',
		'IFCE Tianguá',
		'NUPREDS',
		'turismo sustentável',
		'dados turísticos',
		'Ceará',
		'desenvolvimento regional',
		'inovação em turismo',
	],
	authors: [{ name: 'OTIB - NUPREDS' }],
	creator: 'OTIB',
	publisher: 'NUPREDS',
	metadataBase: new URL('https://nupreds.ifce.edu.br/otib'),
	openGraph: {
		title: 'OTIB - Observatório de Turismo da Ibiapaba',
		description:
			'Projeto do IFCE Campus Tianguá voltado ao desenvolvimento sustentável e inovação no turismo da Ibiapaba.',
		url: 'https://nupreds.ifce.edu.br/otib',
		siteName: 'Observatório de Turismo da Ibiapaba',
		// images: [
		// 	{
		// 		url: 'https://nupreds.ifce.edu.br/otib/images/otib-banner.png',
		// 		width: 1200,
		// 		height: 630,
		// 		alt: 'OTIB - Observatório de Turismo da Ibiapaba',
		// 	},
		// ],
		type: 'website',
	},
	alternates: { canonical: 'https://nupreds.ifce.edu.br/otib' },
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<NextTopLoader showSpinner={false} color="#36de95" height={3} />
				<NextIntlClientProvider locale={locale} messages={messages}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<QueryProvider>
							<div className="min-h-screen max-w-screen">
								<Header />
								{children}
							</div>

							<Toaster richColors closeButton />
						</QueryProvider>
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
