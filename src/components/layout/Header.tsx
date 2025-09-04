import { ThemeSwitcher } from '@/components/fragments/ThemeSwitcher';
import Link from 'next/link';
import { LocaleSwitcher } from '@/components/fragments/LocaleSwitcher';
import { ibmPlexSans } from '@/styles/fonts';
import { OtibLogo } from './OtibLogo';
import { MenuIcon } from 'lucide-react';

export default function Header() {
	return (
		<header className="px-custom w-full py-5 md:py-6 flex flex-col gap-5">
			<div className="w-full flex justify-between items-center transition-opacity">
				<div
					id="left-content"
					className="inline-flex items-center justify-start gap-8"
				>
					<Link href="/">
						<div className="inline-flex gap-2 justify-start items-center hover:opacity-70 cursor-pointer">
							<OtibLogo variant="icon" className="h-8" />
							<span
								className={`${ibmPlexSans.className} font-semibold text-3xl md:text-3xl lg:text-4xl tracking-tight`}
							>
								OTIB
							</span>
						</div>
					</Link>

					<span className="hidden lg:inline-flex items-center justify-start gap-8 text-muted-foreground">
						<Link href="/soon" className="hover:opacity-70">
							Produções
						</Link>
						<Link href="/soon" className="hover:opacity-70">
							Sobre
						</Link>
						<Link href="/soon" className="hover:opacity-70">
							Mapa do Turismo
						</Link>
						<Link href="/soon" className="hover:opacity-70">
							Parceiros
						</Link>
					</span>
				</div>

				<div
					id="right-content"
					className="flex items-center justify-start gap-2"
				>
					<span className="flex items-center justify-start md:hidden cursor-pointer opacity-70">
						<MenuIcon className="size-6" strokeWidth={2.5} />
					</span>

					<span className="hidden md:flex items-center justify-start gap-2">
						<LocaleSwitcher />
						<ThemeSwitcher />
					</span>
				</div>
			</div>
		</header>
	);
}
