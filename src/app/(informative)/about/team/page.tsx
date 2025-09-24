import { LinkType } from '@/@types/link';
import { InformativePageWrapper } from '@/components/layout/InformativePageWrapper';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { Heading } from '@/components/ui/heading';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buttonVariants } from '@/components/ui/button';
import { TeamMembers } from './_components/TeamMembers';
import { team } from './team';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('meta.about/team');
	return {
		title: 'OTIB - ' + t('title'),
	};
}

// TODO: adicionar traduções para áreas do time e adicionar informações dos membros do time (foto e redes)
export default async function AboutTeam() {
	const t = await getTranslations('');

	const breadcrumbs: LinkType[] = [
		{ title: t('meta.home.title'), url: '/otib' },
		{ title: t('meta.about.title'), url: '/otib/about' },
		{ title: t('meta.about/team.title') },
	];

	return (
		<InformativePageWrapper breadcrumbLinks={breadcrumbs}>
			<ScrollProgress />
			<article
				id="team-content"
				className="flex flex-col mb-10 md:mb-6 text-base md:text-lg space-y-8"
			>
				<section id="team-heading" className="flex flex-col gap-8">
					<Heading.H1>{t('app.about/team.h1')}</Heading.H1>
					<p>{t('app.about/team.p.0')}</p>

					<p>
						<a
							className={buttonVariants({
								variant: 'inline-link',
							})}
							href="https://github.com/otib-hub/"
						>
							{t('app.about/team.p.1')}
						</a>
						{t('app.about/team.p.2')}
					</p>

					<p>{t('app.about/team.p.3')}</p>
				</section>

				<section
					id="team-members"
					className="mt-6 flex flex-wrap gap-6"
				>
					<div
						id="team-coordination"
						className="shadow-xl flex-1 md:w-fit rounded-xl p-6 bg-card flex flex-col gap-8"
					>
						<Heading.H2>
							{t('app.about/team.teams.coordination-title')}
						</Heading.H2>
						<TeamMembers teamMembers={team.coordinationTeam} />
					</div>

					<div
						id="team-devs"
						className="w-full md:w-fit rounded-xl p-6 bg-card flex flex-col gap-8"
					>
						<Heading.H2>
							{t('app.about/team.teams.devs-title')}
						</Heading.H2>
						<TeamMembers
							className="flex-row flex-wrap items-center!"
							teamMembers={team.developmentTeam}
						/>
					</div>

					<div
						id="team-design-and-research"
						className="flex-1 rounded-xl p-6 bg-card flex flex-col gap-8"
					>
						<Heading.H2>
							{t('app.about/team.teams.design-title')}
						</Heading.H2>
						<TeamMembers teamMembers={team.designTeam} />
					</div>

					<div
						id="design-and-research"
						className="flex-1 rounded-xl p-6 bg-card flex flex-col gap-8"
					>
						<Heading.H2>
							{t('app.about/team.teams.computer-vision-title')}
						</Heading.H2>
						<TeamMembers teamMembers={team.computerVisionTeam} />
					</div>
				</section>
			</article>
		</InformativePageWrapper>
	);
}
