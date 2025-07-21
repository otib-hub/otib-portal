'use client';

import { OtibLogos, OtibLogoVariants } from '@/assets/logos/otib/otib-logos';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type OtibLogoProps = {
	variant: OtibLogoVariants;
	className?: string;
};

export function OtibLogo({ variant, className }: OtibLogoProps) {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const { resolvedTheme } = useTheme();
	const themeKey = resolvedTheme === 'dark' ? 'dark' : 'light';
	const currentLogo = OtibLogos[variant];

	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	return (
		isMounted && (
			<Image
				src={currentLogo.src[themeKey]}
				alt={`OTIB ${variant} logo`}
				width={currentLogo.width}
				height={currentLogo.height}
				placeholder='empty'
				className={`${className} w-auto`}
			/>
		)
	);
}
