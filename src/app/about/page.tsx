'use client';

import { Badge } from '@/components/ui/badge';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ibmPlexSans } from '@/styles/fonts';
import { ClipboardList, Home } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function About() {
	const t = useTranslations('app.About');
	const router = useRouter();

	return (
		<>
			<Breadcrumb className='mt-3'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/otib'>{t('breadcrumb.1')}</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{t('breadcrumb.2')}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div
				id='about-content'
				className='flex flex-col py-8 md:py-8 mb-10 md:mb-6 text-base md:text-lg space-y-6 lg:space-y-8'
			>
				<section id='about-heading' className='flex flex-col gap-8 md:gap-6'>
					<h1
						className={`${ibmPlexSans.className} font-semibold text-3xl md:text-4xl`}
					>
						{t('content.section.heading.h1')}
					</h1>

					<p className='text-secondary-foreground'>
						{t('content.section.heading.p').split('\n')[0]}
						<strong className='font-extrabold text-primary'>
							{t('content.section.heading.p').split('\n')[1]}
						</strong>{' '}
						{t('content.section.heading.p').split('\n')[2]}
						<br />
						<br />
						{t('content.section.heading.p').split('\n')[3]}
						<br />
						<br />
						{t('content.section.heading.p').split('\n')[4]}
						<br />
						<br />
					</p>
				</section>

				<section id='about-objectives' className='flex flex-col gap-8 md:gap-6'>
					<h2
						className={`${ibmPlexSans.className} font-semibold text-2xl md:text-3xl`}
					>
						{t('content.section.objectives.h2')}
					</h2>

					<ul className='flex flex-col gap-8 md:gap-6'>
						<li className='flex gap-4 items-start md:items-center justify-start'>
							<Badge
								className={`font-bold text-md ${ibmPlexSans.className} bg-accent text-accent-foreground rounded-full`}
							>
								1
							</Badge>
							<p>{t('content.section.objectives.ul.li-1')}</p>
						</li>

						<li className='flex gap-4 items-start md:items-center justify-start'>
							<Badge
								className={`font-bold text-md ${ibmPlexSans.className} bg-accent text-accent-foreground rounded-full`}
							>
								2
							</Badge>
							<p>{t('content.section.objectives.ul.li-2')}</p>
						</li>

						<li className='flex gap-4 items-start md:items-center justify-start'>
							<Badge
								className={`font-bold text-md ${ibmPlexSans.className} bg-accent text-accent-foreground rounded-full`}
							>
								3
							</Badge>
							<p>{t('content.section.objectives.ul.li-3')}</p>
						</li>

						<li className='flex gap-4 items-start md:items-center justify-start'>
							<Badge
								className={`font-bold text-md ${ibmPlexSans.className} bg-accent text-accent-foreground rounded-full`}
							>
								4
							</Badge>
							<p>{t('content.section.objectives.ul.li-4')}</p>
						</li>

						<li className='flex gap-4 items-start md:items-center justify-start'>
							<Badge
								className={`font-bold text-md ${ibmPlexSans.className} bg-accent text-accent-foreground rounded-full`}
							>
								5
							</Badge>
							<p>{t('content.section.objectives.ul.li-5')}</p>
						</li>

						<li className='flex gap-4 items-start md:items-center justify-start'>
							<Badge
								className={`font-bold text-md ${ibmPlexSans.className} bg-accent text-accent-foreground rounded-full`}
							>
								6
							</Badge>
							<p>{t('content.section.objectives.ul.li-6')}</p>
						</li>
					</ul>

					<p>{t('content.section.objectives.p')}</p>
				</section>

				<Card id='about-actions'>
					<CardContent className='space-y-5'>
						{' '}
						<h3 className={`font-semibold text-md`}>
							{t('content.actions.h3')}
						</h3>
						<div className='w-full flex flex-wrap items-center justify-start gap-3'>
							<Button
								className='w-full md:w-fit border-primary/80 border-1'
								variant='ghost'
								onClick={() => router.push('/')}
							>
								<Home className='text-primary size-5' />
								{t('content.actions.buttons.home')}
							</Button>
							<Button
								className='w-full md:w-fit border-primary/80 border-1'
								variant='ghost'
								onClick={() => router.push('/form?referrer=portal-about')}
							>
								<ClipboardList className='text-primary size-5' />
								{t('content.actions.buttons.form')}
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
