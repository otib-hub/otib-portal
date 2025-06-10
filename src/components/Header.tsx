'use client';

import { ModeToggle } from '@/components/ModeToggle';
import { ibmPlexSans } from '../styles/fonts';
import { Separator } from './ui/separator';
import Image from 'next/image';
import otib_logo_dark from '../../public/otib/logo/logo-icon-neg.svg';
import otib_logo_light from '../../public/otib/logo/logo-icon-pos.svg';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LocaleSwitcher } from './LocaleSwitcher';

export default function Header() {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const otib_current_logo =
		theme === 'light' ? otib_logo_light : otib_logo_dark;

	return (
		<header className='w-full flex flex-col gap-5'>
			<div className='w-full flex justify-between items-center'>
				<Link href='/'>
					<div className='inline-flex gap-2 justify-start items-center hover:opacity-70 cursor-pointer transition-opacity'>
						{mounted && (
							<Image
								src={otib_current_logo}
								className='h-8 w-fit'
								alt='OTIB logo'
							/>
						)}
						<h1
							className={`${ibmPlexSans.className} text-3xl font-semibold lg:text-4xl tracking-tight`}
						>
							OTIB
						</h1>
					</div>
				</Link>

				<div className='flex items-center justify-start gap-2'>
					<LocaleSwitcher />
					<ModeToggle />
				</div>
			</div>
			<Separator />
		</header>
	);
}
