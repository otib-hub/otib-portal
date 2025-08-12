import { LocaleInitializer } from '@/components/layout/LocaleInitializer';
import Image from 'next/image';

import form_animated_preview from '#/images/form-preview.webp';
import bulletin_highlight from '#/images/bulletin-highlight.webp';

import { ChevronDown } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { ibmPlexSerif } from '@/styles/fonts';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

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
			<main className='px-custom w-full flex flex-col items-start py-6 gap-8 md:py-8 md:gap-12 mb-10 md:mb-6'>
				<LocaleInitializer />

				<section id='home-hero' className='w-full py-22 md:py-32'>
					<div
						id='home-hero-heading'
						className='flex flex-col items-center justify-center gap-6 text-center'
					>
						<Heading.h1 className='font-medium! text-4xl md:text-5xl'>
							{`${t('heading.title').split('\n')[0]} `}
							<span
								className={`${ibmPlexSerif.className} text-primary font-semibold italic`}
							>
								{t('heading.title').split('\n')[1]}
							</span>
						</Heading.h1>

						<p className='text-base md:text-lg lg:max-w-[72%] text-secondary-foreground'>
							{t('heading.description')}
						</p>

						<Link
							title={t('buttons.about')}
							className={`${buttonVariants({
								variant: 'link',
							})} text-base md:text-lg`}
							href='/about'
						>
							{t('buttons.about')}
						</Link>
					</div>
				</section>

				<ChevronDown className='text-muted-foreground size-8 lg:size-10 place-self-center animate-bounce' />

				<section
					id='home-bento-cards'
					className='w-full grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-2 gap-8 md:gap-8'
				>
					<div
						id='home-bento-cards-1'
						className='bg-card outline-2 outline-muted rounded-xl shadow-lg p-8 flex flex-row justify-center row-start-1 md:row-span-2'
					>
						<div className='bento-cards-content grid grid-cols-1 gap-6 items-start'>
							<Image
								loading='lazy'
								id='home-bento-cards-1-image'
								className='rounded-xl w-full h-full object-cover'
								src={form_animated_preview}
								width={form_animated_preview.width}
								height={form_animated_preview.height}
								unoptimized
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								quality={75}
								placeholder='empty'
								alt='Preview of OTIB form'
							/>

							<div className='bento-cards-heading flex flex-col gap-3'>
								<h2 className='text-2xl font-semibold mb-2'>
									{t('sections.form-card.title')}
								</h2>

								<p className='text-base md:text-lg text-muted-foreground'>
									{t('sections.form-card.description')}
								</p>

								<Link
									title={t('sections.form-card.button_action')}
									className={`${buttonVariants({
										variant: 'default',
									})} w-full md:w-fit mt-3`}
									href={'/researches/tourist-individual?referrer=portal-home'}
								>
									{t('sections.form-card.button_action')}
								</Link>
							</div>
						</div>
					</div>

					{/* TODO: adicionar traduções para os bento-cards */}
					<div
						id='home-bento-cards-2'
						className='bg-card outline-2 outline-muted rounded-xl shadow-lg p-8 flex flex-row justify-center'
					>
						<div className='bento-cards-content flex flex-col md:flex-row-reverse gap-4'>
							<Image
								src={bulletin_highlight}
								width={bulletin_highlight.width}
								height={bulletin_highlight.height}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								quality={75}
								placeholder='empty'
								alt='Bulletin image highlight'
								className='rounded-xl size-full max-h-64 place-self-center object-cover md:hidden lg:block'
							></Image>

							<div className='bento-cards-heading flex flex-col gap-4'>
								<h2 className='text-2xl font-semibold mb-2'>
									Acesse nossos boletins informativos
								</h2>
								<p className='text-base md:text-lg text-muted-foreground'>
									Confira nosso primeiro boletim, que contém dados preliminares
									sobre o Turismo da Ibiapaba
								</p>

								<Link
									title={t('sections.form-card.button_action')}
									className={`${buttonVariants({
										variant: 'default',
									})} w-full md:w-fit mt-3`}
									href='https://nupreds.ifce.edu.br/otib-boletins/boletim01-2025.pdf'
									target='_blank'
								>
									Acessar
								</Link>
							</div>
						</div>
					</div>

					<div
						id='home-bento-cards-3'
						className='bg-card outline-2 outline-muted rounded-xl shadow-lg p-8 flex flex-row justify-center'
					>
						<div className='bento-cards-content flex flex-col md:flex-row-reverse gap-4'>
							<Image
								src={bulletin_highlight}
								width={bulletin_highlight.width}
								height={bulletin_highlight.height}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								quality={75}
								placeholder='empty'
								alt='Tourism map image highlight'
								className='rounded-xl size-full max-h-64 place-self-center object-cover md:hidden lg:block'
							></Image>

							<div className='bento-cards-heading flex flex-col gap-4'>
								<h2 className='text-2xl font-semibold mb-2'>Mapa do Turismo</h2>
								<p className='text-base md:text-lg text-muted-foreground'>
									Explore um pouco do que a Ibiapaba pode oferecer nos 9
									municípios
								</p>

								<Link
									title={t('sections.form-card.button_action')}
									className={`${buttonVariants({
										variant: 'default',
									})} w-full md:w-fit mt-3`}
									href='/soon'
								>
									Acessar
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
