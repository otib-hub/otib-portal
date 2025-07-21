import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { CogIcon, HomeIcon } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('app.soon');
	return {
		title: t('page-title'),
	};
}

export default async function UnderConstruction() {
	const t = await getTranslations('app.soon');

	return (
		<main className='px-custom w-full h-[calc(100dvh-109px-24px)] flex flex-col gap-5 justify-center items-center text-3xl lg:text-4xl font-semibold tracking-tight'>
			<div className='flex flex-col lg:flex-row gap-8 items-center'>
				<CogIcon className='text-secondary-foreground size-40 lg:size-60 animate-spin animation-duration-[12s]' />

				<div className='flex flex-col gap-8 md:gap-6'>
					<Heading.h1 className='font-black text-2xl md:text-3xl max-w-3xl'>
						{t('h1')}
					</Heading.h1>
					<p className='text-lg font-normal text-muted-foreground max-w-3xl'>
						{t('p')}
					</p>

					<Link
						title={t('button_home')}
						className={`${buttonVariants({
							variant: 'default',
						})}w-full md:w-fit`}
						href={'/'}
					>
						<HomeIcon className='h-full w-fit' />
						{t('button_home')}
					</Link>
				</div>
			</div>
		</main>
	);
}
