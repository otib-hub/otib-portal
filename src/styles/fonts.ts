import {
	IBM_Plex_Mono,
	IBM_Plex_Sans,
	IBM_Plex_Serif,
	Inter,
} from 'next/font/google';

export const inter = Inter({
	weight: '400',
	display: 'swap',
	fallback: ['sans'],
	subsets: ['latin'],
	variable: '--font-inter',
	preload: true,
});

export const ibmPlexSans = IBM_Plex_Sans({
	weight: ['400', '500', '600', '700'],
	fallback: ['sans'],
	subsets: ['latin'],
	variable: '--font-ibm-plex-sans',
	preload: false,
});

export const ibmPlexMono = IBM_Plex_Mono({
	weight: '500',
	fallback: ['mono'],
	subsets: ['latin'],
	variable: '--font-ibm-plex-mono',
	preload: false,
});

export const ibmPlexSerif = IBM_Plex_Serif({
	weight: ['500', '600', '700'],
	fallback: ['serif'],
	subsets: ['latin'],
	variable: '--font-ibm-plex-serif',
	style: ['normal', 'italic'],
	preload: false,
});
