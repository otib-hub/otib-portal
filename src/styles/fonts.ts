import { IBM_Plex_Mono, IBM_Plex_Sans, Inter } from 'next/font/google';

export const inter = Inter({
	weight: '400',
	display: 'swap',
	fallback: ['sans'],
	subsets: ['latin'],
	variable: '--font-inter',
});

export const ibmPlexSans = IBM_Plex_Sans({
	weight: '600',
	fallback: ['sans'],
	subsets: ['latin'],
	variable: '--font-ibm-plex-sans',
});

export const ibmPlexMono = IBM_Plex_Mono({
	weight: '500',
	fallback: ['mono'],
	subsets: ['latin'],
	variable: '--font-ibm-plex-mono',
});
