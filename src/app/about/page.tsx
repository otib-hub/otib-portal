import { LinkType } from '@/@types/link';
import { InformativePageWrapper } from '@/components/layout/InformativePageWrapper';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { ibmPlexSans } from '@/styles/fonts';
import { ClipboardList, Home } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('meta.about');
	return {
		title: 'OTIB - ' + t('title'),
	};
}

export default async function About() {
	const t = await getTranslations('');
	const objectives = [
		{
			id: 1,
			text: t('app.about.content.section.objectives.ul.li-1'),
		},
		{
			id: 2,
			text: t('app.about.content.section.objectives.ul.li-2'),
		},
		{
			id: 3,
			text: t('app.about.content.section.objectives.ul.li-3'),
		},
		{
			id: 4,
			text: t('app.about.content.section.objectives.ul.li-4'),
		},
		{
			id: 5,
			text: t('app.about.content.section.objectives.ul.li-5'),
		},
		{
			id: 6,
			text: t('app.about.content.section.objectives.ul.li-6'),
		},
	];

	const breadcrumbs: LinkType[] = [
		{ title: t('meta.home.title'), url: '/otib' },
		{ title: t('meta.about.title') },
	];

	// TODO: GenericHtml component para conteúdo informativo estático
	return (
		<InformativePageWrapper breadcrumbLinks={breadcrumbs}>
			<ScrollProgress />
			<article id="about-content" className="flex flex-col space-y-8">
				<section id="about-heading" className="flex flex-col gap-8">
					<Heading.H1>
						{t('app.about.content.section.heading.h1')}
					</Heading.H1>

					<p>
						{t('app.about.content.section.heading.p.0')}
						<strong className="font-extrabold text-primary">
							{t('app.about.content.section.heading.p.1')}
						</strong>{' '}
						{t('app.about.content.section.heading.p.2')}
					</p>

					<p>
						{t('app.about.content.section.heading.p.3')}
						<a
							className={buttonVariants({
								variant: 'inline-link',
							})}
							href="/otib/about/team"
						>
							{t('app.about.content.section.heading.p.4')}
						</a>
						{t('app.about.content.section.heading.p.5')}
					</p>

					<p>{t('app.about.content.section.heading.p.6')}</p>
				</section>

				<section
					id="about-objectives"
					className="flex flex-col gap-8 md:gap-6"
				>
					<h2
						className={`${ibmPlexSans.className} font-semibold text-2xl md:text-3xl`}
					>
						{t('app.about.content.section.objectives.h2')}
					</h2>

					<ol className="list-inside space-y-4 list-decimal marker:text-primary marker:text-lg marker:font-bold">
						{objectives.map((objective) => (
							<li key={objective.id}>
								<p className="inline">{objective.text}</p>
							</li>
						))}
					</ol>
					<p>{t('app.about.content.section.objectives.p')}</p>
				</section>

				<Card id="about-actions">
					<CardContent className="space-y-5">
						<h3 className={`font-semibold text-md`}>
							{t('app.about.content.actions.h3')}
						</h3>
						<div className="w-full flex flex-wrap items-center justify-start gap-3">
							<Link
								title={t(
									'app.about.content.actions.buttons.home',
								)}
								className={`${buttonVariants({
									variant: 'outline',
								})} w-full md:w-fit`}
								href="/"
							>
								<Home className="text-primary size-5" />
								{t('app.about.content.actions.buttons.home')}
							</Link>
							<Link
								title={t(
									'app.about.content.actions.buttons.form',
								)}
								className={`${buttonVariants({
									variant: 'outline',
								})} w-full md:w-fit`}
								href="/researches/tourist-individual?referrer=about-page"
							>
								<ClipboardList className="text-primary size-5" />
								{t('app.about.content.actions.buttons.form')}
							</Link>
						</div>
					</CardContent>
				</Card>
			</article>
		</InformativePageWrapper>
	);
}
