import { buttonVariants } from '../ui/button';
import Link from 'next/link';
import { OtibLogo } from './OtibLogo';
import { getTranslations } from 'next-intl/server';

const footerLinkStyle = buttonVariants({
	variant: 'inline-link',
	className:
		'!text-sm text-secondary-foreground/70 no-underline! hover:underline!',
});

type FooterProps = {
	className?: string;
};

export async function Footer({ className }: FooterProps) {
	const t = await getTranslations();

	return (
		<footer
			id="footer-content"
			className={`bg-card text-base p-10 flex flex-col gap-6 rounded-t-2xl + ${className}`}
		>
			<div
				id="footer-first-row"
				className="h-fit flex flex-col lg:flex-row gap-6 justify-center md:justify-between"
			>
				<OtibLogo variant="horizontal" className="h-8" />

				<div
					id="footer-first-row-links"
					className="flex gap-x-6 justify-center gap-y-2 flex-wrap"
				>
					<Link href="/" className={footerLinkStyle}>
						{t('meta.home.title')}
					</Link>

					<Link href="/about" className={footerLinkStyle}>
						{t('meta.about.title')}
					</Link>

					<Link href="/productions" className={footerLinkStyle}>
						{t('meta.productions.title')}
					</Link>

					<Link href="/tourism-map" className={footerLinkStyle}>
						{t('meta.tourism-map.title')}
					</Link>

					<Link href="/partners" className={footerLinkStyle}>
						{t('meta.partners.title')}
					</Link>
				</div>
			</div>

			<div
				id="footer-second-row"
				className="flex flex-col md:flex-row justify-between gap-2 text-center md:text-start"
			>
				<span className="text-sm">
					&copy; 2025 Observatório de Turismo da Ibiapaba
				</span>{' '}
				<span className="text-sm">
					{t('components.Footer.end-text')}
				</span>
			</div>
		</footer>
	);
}
