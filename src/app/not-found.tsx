'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Compass } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

export default function NotFound() {
	const t = useTranslations('app.not-found');

	return (
		<>
			<Head>
				<title>{t('page-title')}</title>
			</Head>
			<main className='px-custom w-full h-[calc(100dvh-109px-24px)] flex flex-col gap-5 justify-center items-center text-3xl lg:text-4xl font-semibold tracking-tight'>
				<div className='flex flex-col lg:flex-row gap-8 items-center'>
					<Compass className='text-secondary-foreground size-40 lg:size-60 animate-compass-spin' />

					<div className='flex flex-col gap-8 md:gap-6'>
						<Heading.h1 className='font-black text-2xl md:text-3xl max-w-3xl'>
							{t('title')}
						</Heading.h1>
						<p className='text-lg font-normal text-muted-foreground max-w-3xl'>
							{t('description')}
						</p>

						<Button
							title={t('button_back')}
							variant='default'
							className='w-full md:w-fit'
							onClick={() => window.history.back()}
						>
							{t('button_back')}
						</Button>
					</div>
				</div>
			</main>
		</>
	);
}
