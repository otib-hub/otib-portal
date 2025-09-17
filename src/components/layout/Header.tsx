'use client';

import { ThemeSwitcher } from '@/components/fragments/ThemeSwitcher';
import Link from 'next/link';
import { LocaleSwitcher } from '@/components/fragments/LocaleSwitcher';
import { ibmPlexSans } from '@/styles/fonts';
import { OtibLogo } from './OtibLogo';
import { MobileMenuSheet } from './MobileMenuSheet';
import { useTranslations } from 'next-intl';
import { useIsMobile } from '@/hooks/layout/use-mobile';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '../ui/button';

type HeaderProps = {
	className?: string;
};

export default function Header({ className }: HeaderProps) {
	const isMobile = useIsMobile();
	const t = useTranslations('components.Header');
	const currentPage = usePathname();

	let links = [
		{ title: t('nav.quick-links.home'), url: '/' },
		{ title: t('nav.quick-links.productions'), url: '/productions' },
		{ title: t('nav.quick-links.about'), url: '/about' },
		{ title: t('nav.quick-links.tourism-map'), url: '/tourism-map' },
		{ title: t('nav.quick-links.partners'), url: '/partners' },
	];
	links = links.filter((item) => item.url !== currentPage);

	return (
		<header
			className={`bg-background/80 backdrop-blur-md z-25 sticky top-0 px-custom w-full py-3 h-16 flex flex-col gap-5 ${className}`}
		>
			<nav className="w-full flex justify-between items-center">
				<div
					id="left-content"
					className="inline-flex items-center justify-start gap-8"
				>
					<Link
						href="/"
						className="md:mr-2 hover:opacity-70 transition-opacity"
					>
						<div className="inline-flex gap-2 justify-start items-center cursor-pointer">
							<OtibLogo variant="icon" className="h-6" />
							<span
								className={`${ibmPlexSans.className} font-semibold text-3xl tracking-tight`}
							>
								OTIB
							</span>
						</div>
					</Link>

					<span className="hidden md:inline-flex md:text-sm lg:text-base items-center justify-center gap-4 text-muted-foreground">
						{links.map((item) =>
							item.url === '/' ? undefined : ( // nao mostra homepage no Header (ja tem a logo), somente no MobileMenuSheet
								<Link
									key={item.title}
									href={item.url}
									className={buttonVariants({
										variant: 'ghost',
										size: 'sm',
									})}
								>
									{item.title}
								</Link>
							),
						)}
					</span>
				</div>

				<div
					id="right-content"
					className="flex items-center justify-start gap-2"
				>
					{isMobile ? (
						<span className="flex items-center justify-start md:hidden cursor-pointer opacity-70">
							<MobileMenuSheet links={links} />
						</span>
					) : (
						<span className="hidden md:flex items-center justify-start gap-2">
							<LocaleSwitcher />
							<ThemeSwitcher />
						</span>
					)}
				</div>
			</nav>
		</header>
	);
}
