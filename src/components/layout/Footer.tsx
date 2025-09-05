import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';
import { OtibLogo } from './OtibLogo';

export function Footer() {
	return (
		<footer className="mt-20 bg-card text-base p-10 flex flex-col justify-center items-center gap-8">
			<div className="flex flex-col justify-center items-center gap-6 md:max-w-164">
				<OtibLogo variant="horizontal" className="h-8" />

				<span className="text-sm">
					Observatório de Turismo da Ibiapaba (OTIB): um projeto do
					IFCE Campus Tianguá com apoio de parcerias regionais para
					auxiliar no desenvolvimento da Serra da Ibiapaba.
				</span>
			</div>

			<div className="flex flex-col justify-center items-center gap-4 self-stretch">
				<span className="font-semibold text-base">
					Explore nosso portal
				</span>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap justify-center items-center">
					<Link
						href="/"
						className={cn(
							buttonVariants({ variant: 'link' }),
							'text-secondary-foreground/70',
						)}
					>
						Página Inicial
					</Link>
					<Link
						href="/about"
						className={cn(
							buttonVariants({ variant: 'link' }),
							'text-secondary-foreground/70',
						)}
					>
						Sobre o OTIB
					</Link>
					<Link
						href="/soon" // TODO: página de boletins
						className={cn(
							buttonVariants({ variant: 'link' }),
							'text-secondary-foreground/70',
						)}
					>
						Boletins
					</Link>
					<Link
						href="/tourism-map"
						className={cn(
							buttonVariants({ variant: 'link' }),
							'text-secondary-foreground/70',
						)}
					>
						Mapa do Turismo da Ibiapaba
					</Link>
					<Link
						href="/soon" // TODO: página de parceiros
						className={cn(
							buttonVariants({ variant: 'link' }),
							'text-secondary-foreground/70',
						)}
					>
						Parceiros
					</Link>
				</div>
			</div>
		</footer>
	);
}
