import { LocaleInitializer } from '@/components/layout/LocaleInitializer';

import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { ibmPlexSerif } from '@/styles/fonts';
import { getTranslations } from 'next-intl/server';
import { HomeBentoGrid } from './_components/HomeBentoGrid';
import { HomeMarquee } from './_components/HomeMarquee';
import { RevealOnScroll } from '../components/layout/RevealOnScroll';

export default async function Home() {
	const t = await getTranslations('app.home');

	return (
		<>
			<main className="px-custom w-full flex flex-col items-start gap-6 md:gap-10 mb-10 md:mb-6">
				<LocaleInitializer />

				<section
					id="home-heading"
					className="w-full pt-4 md:pt-10 flex flex-col justify-center gap-8"
				>
					<div
						id="home-hero-heading"
						className="w-full md:max-w-148 place-self-center flex flex-col items-center justify-center gap-6 text-center"
					>
						<Heading.H1 className="md:text-5xl">
							{`${t('heading.title').split('\n')[0]} `}
							<span
								className={`${ibmPlexSerif.className} font-semibold italic bg-gradient-to-r from-chart-2 to-chart-5 bg-clip-text text-transparent`}
							>
								{t('heading.title').split('\n')[1]}
							</span>
						</Heading.H1>

						<p className="text-base text-secondary-foreground">
							{t('heading.description')}
						</p>

						<Link
							title={t('buttons.about')}
							className={`${buttonVariants({
								variant: 'inline-link',
							})} text-base`}
							href="/about"
						>
							{t('buttons.about')}
						</Link>
					</div>

					<div
						id="home-hero"
						className="w-full order-first md:order-last"
					>
						<HomeMarquee />
					</div>
				</section>

				<RevealOnScroll>
					<section
						id="home-bento-cards"
						className="mt-20 w-full grid grid-cols-1 md:grid-cols-2 gap-8"
					>
						<HomeBentoGrid t={t} />
					</section>
				</RevealOnScroll>
			</main>

			<Footer />
		</>
	);
}
