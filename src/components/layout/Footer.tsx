'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import otib_logo_dark from '#/otib/logo/logo-icon-neg.svg';
import otib_logo_light from '#/otib/logo/logo-icon-pos.svg';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Footer() {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	const otib_current_logo =
		theme === 'light' ? otib_logo_light : otib_logo_dark;

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	return (
		<footer className='mt-20 bg-card text-sm p-10 flex flex-col justify-center items-center gap-6'>
			<div className='flex flex-col justify-center items-center gap-4 self-stretch'>
				{mounted && (
					<Image
						src={otib_current_logo}
						className='h-12 w-fit'
						alt='OTIB logo'
					/>
				)}

				<span>
					Observatório de Turismo da Ibiapaba (OTIB): um projeto do IFCE Campus
					Tianguá com apoio de parcerias regionais para auxiliar no
					desenvolvimento da Serra da Ibiapaba.
				</span>
			</div>

			<div className='flex flex-col justify-center items-center gap-4 self-stretch'>
				<span className='font-semibold text-base'>Explore nosso portal</span>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap justify-center items-center'>
					<Link
						href='/'
						className={cn(
							buttonVariants({ variant: 'link' }),
							'text-secondary-foreground/70'
						)}
					>
						Página Inicial
					</Link>
					<Link
						href='/about'
						className={cn(
							buttonVariants({ variant: 'link' }),
							'text-secondary-foreground/70'
						)}
					>
						Sobre o OTIB
					</Link>
					<Link
						href='/bulletins'
						className={cn(
							buttonVariants({ variant: 'link' }),
							'text-secondary-foreground/70'
						)}
					>
						Boletins
					</Link>
					<Link
						href='/tourism-map'
						className={cn(
							buttonVariants({ variant: 'link' }),
							'text-secondary-foreground/70'
						)}
					>
						Mapa do Turismo da Ibiapaba
					</Link>
					<Link
						href='/partners'
						className={cn(
							buttonVariants({ variant: 'link' }),
							'text-secondary-foreground/70'
						)}
					>
						Parceiros
					</Link>
				</div>
			</div>
		</footer>
	);
}
