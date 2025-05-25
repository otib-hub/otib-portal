import Header from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/providers/ThemeProvider';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { inter } from '../styles/fonts';
import '../styles/globals.css';

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
	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<NextIntlClientProvider>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<div className='min-h-screen min-w-full p-6'>
							<Header />
							{children}
						</div>
						<Toaster richColors closeButton />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
