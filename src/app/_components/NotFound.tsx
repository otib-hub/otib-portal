'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { ArrowLeftIcon, Compass, HomeIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function NotFound() {
	const t = useTranslations('app.not-found');
	const router = useRouter();

	const handlePreviousPage = () => {
		router.back();
	};

	return (
		<main className="px-custom w-full h-[calc(100dvh-109px-24px)] flex flex-col gap-5 justify-center items-center text-3xl lg:text-4xl font-semibold tracking-tight">
			<div className="flex flex-col lg:flex-row gap-8 items-center">
				<Compass className="text-secondary-foreground size-32 md:size-40 animate-compass-spin" />

				<div className="flex flex-col gap-8 md:gap-6">
					<Heading.H1 className="max-w-3xl">{t('title')}</Heading.H1>
					<p className="text-base md:text-lg font-normal text-muted-foreground max-w-3xl">
						{t('description')}
					</p>

					<div className="w-full flex flex-col md:flex-row items-center justify-start gap-4">
						<Button
							title={t('button_back')}
							variant="default"
							className="w-full md:w-fit"
							onClick={handlePreviousPage}
						>
							<ArrowLeftIcon className="h-full w-fit" />
							{t('button_back')}
						</Button>

						<Link
							title={t('button_home')}
							className={`${buttonVariants({
								variant: 'ghost',
							})} w-full md:w-fit`}
							href={'/'}
						>
							<HomeIcon className="h-full w-fit" />
							{t('button_home')}
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
