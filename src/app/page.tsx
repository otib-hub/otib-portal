import { LocaleInitializer } from '@/components/layout/LocaleInitializer';

import { ChevronDown } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { ibmPlexSerif } from '@/styles/fonts';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { HomeBentoGrid } from './_components/HomeBentoGrid';
import { VerticalMarquee } from './_components/VerticalMarquee';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('app.Home');
	return {
		title: t('page-title'),
	};
}

export default async function Home() {
	const t = await getTranslations('app.Home');

	return (
		<>
			<main className="px-custom w-full flex flex-col items-start py-6 gap-8 md:py-6 md:gap-12 mb-10 md:mb-6">
				<LocaleInitializer />

				<section
					id="home-heading"
					className="w-full flex flex-col md:flex-row justify-center gap-8 lg:gap-16"
				>
					<div
						id="home-hero-heading"
						className="flex flex-col items-start justify-center gap-6 text-start lg:max-w-132"
					>
						<Heading.H1 className="font-medium! text-4xl md:text-5xl">
							{`${t('heading.title').split('\n')[0]} `}
							<span
								className={`${ibmPlexSerif.className} font-semibold italic bg-gradient-to-r from-chart-2 to-chart-5 bg-clip-text text-transparent`}
							>
								{t('heading.title').split('\n')[1]}
							</span>
						</Heading.H1>

						<p className="text-base md:text-lg text-secondary-foreground">
							{t('heading.description')}
						</p>

						<Link
							title={t('buttons.about')}
							className={`${buttonVariants({
								variant: 'link',
							})} text-base md:text-lg`}
							href="/about"
						>
							{t('buttons.about')}
						</Link>
					</div>

					<div
						id="home-hero"
						className="w-full order-first md:order-last"
					>
						<VerticalMarquee/>
					</div>
				</section>

				<ChevronDown className="text-muted-foreground size-8 lg:size-10 place-self-center animate-bounce" />

				<section
					id="home-bento-cards"
					className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
				>
					<HomeBentoGrid t={t} />
				</section>
			</main>

			<Footer />
		</>
	);
}
