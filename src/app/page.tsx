'use client';

import { LocaleInitializer } from '@/components/layout/LocaleInitializer';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ibmPlexSans } from '@/styles/fonts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';

import form_preview_image from '../../public/assets/images/form-preview.png';
import highlights_1 from '../../public/assets/images/highlights_1.png';
import highlights_2 from '../../public/assets/images/highlights_2.png';
import highlights_3 from '../../public/assets/images/highlights_3.png';
import highlights_4 from '../../public/assets/images/highlights_4.png';
import highlights_5 from '../../public/assets/images/highlights_5.png';
import highlights_6 from '../../public/assets/images/highlights_6.png';
import highlights_7 from '../../public/assets/images/highlights_7.png';
import { useTranslations } from 'next-intl';

const images_top = [highlights_1, highlights_2, highlights_3, highlights_4];
const images_bottom = [highlights_5, highlights_6, highlights_7];

export default function Home() {
	const router = useRouter();
	const t = useTranslations('app.Home');

	return (
		<main className='w-full flex flex-col items-start py-6 gap-8 md:py-8 md:gap-12'>
			<LocaleInitializer />

			<div className='hero w-full flex flex-col-reverse md:flex-row items-center justify-start gap-6 md:gap-16'>
				<div className='w-full heading flex flex-col gap-6'>
					<div className='buttons flex gap-3'>
						<Button
							variant='secondary'
							className='rounded-full'
							onClick={() => router.push('#form-card')}
						>
							{t('buttons.form')}
						</Button>
					</div>

					<h1
						className={`${ibmPlexSans.className} font-semibold text-3xl md:text-4xl`}
					>
						{`${t('heading.title').split('\n')[0]} `}
						<span className='text-primary'>
							{t('heading.title').split('\n')[1]}
						</span>
					</h1>

					<p className='text-base md:text-lg text-secondary-foreground'>
						{t('heading.description')}
					</p>
				</div>

				<div className='w-full flex flex-col gap-4'>
					{/* Top Carousel */}
					<Carousel
						opts={{
							align: 'start',
							dragFree: true,
						}}
						className='w-full'
					>
						<CarouselContent>
							{images_top.map((img, index) => (
								<CarouselItem key={index} className='basis-auto'>
									<Image
										src={img}
										alt={`Ibiapaba highlight number ${index}`}
										draggable={false}
										className='shadow-2xl shadow-black rounded-xl h-auto max-h-40 w-60 object-cover'
									/>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>

					{/* Bottom Carousel */}
					<Carousel
						opts={{
							align: 'start',
							dragFree: true,
						}}
						className='w-full'
					>
						<CarouselContent>
							{images_bottom.map((img, index) => (
								<CarouselItem key={index} className='basis-auto'>
									<Image
										src={img}
										alt={`Ibiapaba highlight number ${index + 6}`}
										draggable={false}
										className='shadow-2xl shadow-black rounded-xl max-h-40 w-72 object-cover'
									/>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</div>

			<Card
				id='form-card'
				className='w-full flex flex-col-reverse p-6 md:flex-row md:justify-between items-center justify-start'
			>
				<CardContent className='space-y-5 px-0 flex flex-col items-start justify-center'>
					<CardHeader className='w-full flex flex-col md:flex-row px-0'>
						<CardTitle>
							<h2 className='text-2xl font-semibold'>
								{t('sections.form-card.title')}
							</h2>
						</CardTitle>
					</CardHeader>

					<CardDescription className='space-y-6'>
						<p className='text-base text-muted-foreground'>
							{t('sections.form-card.description')}
						</p>
						<Button
							className='w-full md:w-fit'
							onClick={() => router.push('/form?referrer=portal-home')}
						>
							{t('sections.form-card.button_action')}
						</Button>
					</CardDescription>
				</CardContent>

				<Image
					className='rounded-xl w-full max-w-xs'
					src={form_preview_image}
					alt='Preview of OTIB form'
				/>
			</Card>
		</main>
	);
}
