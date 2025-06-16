import Header from '@/components/layout/Header';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/providers/ThemeProvider';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { inter } from '@/styles/fonts';
import '@/styles/globals.css';
import QueryProvider from '@/providers/QueryProvider';

export const metadata: Metadata = {
	title: 'OTIB - Protótipo',
	description: 'Uma implementação inicial do OTIB',
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
				<NextIntlClientProvider locale={locale} messages={messages}>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<QueryProvider>
							<div className='min-h-screen max-w-screen px-6 md:px-8 lg:px-14'>
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
