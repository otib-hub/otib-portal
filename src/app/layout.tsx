import type { Metadata } from 'next';
import '../styles/globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { inter } from '../styles/fonts';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/Header';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
	title: 'OTIB - Protótipo',
	description: 'Uma implementação inicial do OTIB',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-br' suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
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
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
