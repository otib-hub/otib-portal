import { LinkType } from '@/@types/link';
import { Footer } from '@/components/layout/Footer';
import { InformativePageWrapper } from '@/components/layout/InformativePageWrapper';
import { Badge } from '@/components/ui/badge';
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

	const breadcrumbs: LinkType[] = [
		{
			title: t('meta.home.title'),
			url: '/otib',
		},
		{
			title: t('meta.about.title'),
		},
	];

	// TODO: GenericHtml component para conteúdo informativo estático
	return (
		<InformativePageWrapper breadcrumbLinks={breadcrumbs}>
			<article
				id="about-content"
				className="px-custom flex flex-col py-8 md:py-8 mb-10 md:mb-6 text-base md:text-lg space-y-6 lg:space-y-8"
			>
				<section
					id="about-heading"
					className="flex flex-col gap-8 md:gap-6"
				>
					<Heading.H1>
						{t('app.about.content.section.heading.h1')}
					</Heading.H1>

					<p className="text-secondary-foreground">
						{
							t('app.about.content.section.heading.p').split(
								'\n',
							)[0]
						}
						<strong className="font-extrabold text-primary">
							{
								t('app.about.content.section.heading.p').split(
									'\n',
								)[1]
							}
						</strong>{' '}
						{
							t('app.about.content.section.heading.p').split(
								'\n',
							)[2]
						}
						<br />
						<br />
						{
							t('app.about.content.section.heading.p').split(
								'\n',
							)[3]
						}
						<br />
						<br />
						{
							t('app.about.content.section.heading.p').split(
								'\n',
							)[4]
						}
						<br />
						<br />
					</p>
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

					<ul className="flex flex-col gap-8 md:gap-6">
						<li className="flex gap-4 items-start md:items-center justify-start">
							<Badge
								className={`font-bold text-md ${ibmPlexSans.className} bg-accent text-accent-foreground rounded-full`}
							>
								1
							</Badge>
							<p>
								{t(
									'app.about.content.section.objectives.ul.li-1',
								)}
							</p>
						</li>

						<li className="flex gap-4 items-start md:items-center justify-start">
							<Badge
								className={`font-bold text-md ${ibmPlexSans.className} bg-accent text-accent-foreground rounded-full`}
							>
								2
							</Badge>
							<p>
								{t(
									'app.about.content.section.objectives.ul.li-2',
								)}
							</p>
						</li>

						<li className="flex gap-4 items-start md:items-center justify-start">
							<Badge
								className={`font-bold text-md ${ibmPlexSans.className} bg-accent text-accent-foreground rounded-full`}
							>
								3
							</Badge>
							<p>
								{t(
									'app.about.content.section.objectives.ul.li-3',
								)}
							</p>
						</li>

						<li className="flex gap-4 items-start md:items-center justify-start">
							<Badge
								className={`font-bold text-md ${ibmPlexSans.className} bg-accent text-accent-foreground rounded-full`}
							>
								4
							</Badge>
							<p>
								{t(
									'app.about.content.section.objectives.ul.li-4',
								)}
							</p>
						</li>

						<li className="flex gap-4 items-start md:items-center justify-start">
							<Badge
								className={`font-bold text-md ${ibmPlexSans.className} bg-accent text-accent-foreground rounded-full`}
							>
								5
							</Badge>
							<p>
								{t(
									'app.about.content.section.objectives.ul.li-5',
								)}
							</p>
						</li>

						<li className="flex gap-4 items-start md:items-center justify-start">
							<Badge
								className={`font-bold text-md ${ibmPlexSans.className} bg-accent text-accent-foreground rounded-full`}
							>
								6
							</Badge>
							<p>
								{t(
									'app.about.content.section.objectives.ul.li-6',
								)}
							</p>
						</li>
					</ul>

					<p>{t('app.about.content.section.objectives.p')}</p>
				</section>

				<Card id="about-actions">
					<CardContent className="space-y-5">
						{' '}
						<h3 className={`font-semibold text-md`}>
							{t('app.about.content.actions.h3')}
						</h3>
						<div className="w-full flex flex-wrap items-center justify-start gap-3">
							<Link
								title={t(
									'app.about.content.actions.buttons.home',
								)}
								className={`${buttonVariants({
									variant: 'ghost',
								})} w-full md:w-fit border-primary/80 border-1`}
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
									variant: 'ghost',
								})} w-full md:w-fit border-primary/80 border-1`}
								href="/researches/tourist-individual?referrer=about-page"
							>
								<ClipboardList className="text-primary size-5" />
								{t('app.about.content.actions.buttons.form')}
							</Link>
						</div>
					</CardContent>
				</Card>
			</article>

			<Footer />
		</InformativePageWrapper>
	);
}
