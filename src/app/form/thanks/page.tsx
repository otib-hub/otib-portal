'use client';

import { Button } from '@/components/ui/button';
import { ibmPlexSans } from '@/styles/fonts';
import { useRouter } from 'next/navigation';
import shared_goals_drawing from '#/drawings/undraw_shared-goals.svg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ThankYouPage() {
	const router = useRouter();
	const t = useTranslations('app.form/thanks');

	return (
		<main className='flex flex-col items-start py-6 gap-8 md:py-8 md:gap-12'>
			<div className='hero flex flex-col-reverse md:grid md:grid-cols-2 items-center justify-start gap-8'>
				<div className='heading flex flex-col gap-6'>
					<div className='buttons flex items-center justify-start gap-3'>
						<Button
							className='rounded-full'
							variant='secondary'
							onClick={() => router.push('/')}
						>
							{t('heading.buttons.start')}
						</Button>
					</div>
					<h1
						className={`${ibmPlexSans.className} font-semibold text-primary text-3xl md:text-4xl`}
					>
						{t('heading.title')}
					</h1>
					<p className='text-base md:text-lg text-secondary-foreground'>
						{t('heading.description').split('\n')[0]}
						<br />
						<br />
						{t('heading.description').split('\n')[1]}
					</p>
				</div>
				<div className='image flex items-center justify-center'>
					<Image
						src={shared_goals_drawing}
						className='h-64 md:h-auto md:max-h-81'
						alt='Drawing of two people analysing responses'
					></Image>
				</div>
			</div>

			<Card className='w-full'>
				<CardHeader>
					<CardTitle>
						<h2 className='text-2xl font-semibold'>
							{t('section/what-happens-now.title')}
						</h2>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col gap-4'>
						<p className='text-base md:text-lg text-secondary-foreground space-y-2'>
							<span className='font-semibold'>
								{t('section/what-happens-now.paragraphs.1.title')}
							</span>
							<br />
							<span className='text-muted-foreground'>
								{t('section/what-happens-now.paragraphs.1.description')}
							</span>
						</p>
						<p className='text-base md:text-lg text-secondary-foreground space-y-2'>
							<span className='font-semibold'>
								{t('section/what-happens-now.paragraphs.2.title')}
							</span>
							<br />
							<span className='text-muted-foreground'>
								{t('section/what-happens-now.paragraphs.2.description')}
							</span>
						</p>
						<p className='text-base md:text-lg text-secondary-foreground space-y-2'>
							<span className='font-semibold'>
								{t('section/what-happens-now.paragraphs.3.title')}
							</span>
							<br />
							<span className='text-muted-foreground'>
								{t('section/what-happens-now.paragraphs.3.description')}
							</span>
						</p>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
