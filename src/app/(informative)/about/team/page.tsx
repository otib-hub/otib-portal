import { LinkType } from '@/@types/link';
import { InformativePageWrapper } from '@/components/layout/InformativePageWrapper';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { Heading } from '@/components/ui/heading';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buttonVariants } from '@/components/ui/button';
import { GithubIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
import { TeamMember } from '@/@types/team-member';
import { TeamMembers } from './_components/TeamMembers';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('meta.about/team');
	return {
		title: 'OTIB - ' + t('title'),
	};
}

const coordinationTeam: TeamMember[] = [
	{
		id: 0,
		name: 'Nécio Veras',
		role: 'Coordination',
		profilePhotoSrc:
			'https://media.licdn.com/dms/image/v2/D4D03AQFvs38Svmtu9g/profile-displayphoto-shrink_800_800/B4DZcyy71nGUAk-/0/1748903903308?e=1761177600&v=beta&t=-_x7Yyz-WlrKWMiTw9xhUgyV7IoPdj534EPdcobdl6w',
		links: [
			{
				id: 0,
				title: 'LinkedIn',
				url: 'https://linkedin.com/in/necioveras',
				icon: <LinkedinIcon className="size-4" />,
			},
		],
	},
];

const developmentTeam: TeamMember[] = [
	{
		id: 0,
		name: 'Manuel Carlos',
		role: 'Frontend Developer',
		profilePhotoSrc:
			'https://avatars.githubusercontent.com/u/110443154?v=4',
		links: [
			{
				id: 0,
				title: 'LinkedIn',
				url: 'https://linkedin.com/in/1manuelc',
				icon: <LinkedinIcon className="size-4" />,
			},
			{
				id: 1,
				title: 'Github',
				url: 'https://github.com/1manuelc',
				icon: <GithubIcon className="size-4" />,
			},
			{
				id: 2,
				title: 'Instagram',
				url: 'https://instagram.com/1manuelc.dev',
				icon: <InstagramIcon className="size-4" />,
			},
		],
	},
	{
		id: 1,
		name: 'Murilo Rodrigues',
		role: 'Backend Developer',
		profilePhotoSrc:
			'https://media.licdn.com/dms/image/v2/D4D03AQEca5C5XmsVyQ/profile-displayphoto-shrink_400_400/B4DZRlZiRXHEAg-/0/1736867980852?e=1760572800&v=beta&t=UaRm2z16gLAR9anMl4UBmcrlSKpqZctnPvqoYsw_cQs',
		links: [
			{
				id: 0,
				title: 'LinkedIn',
				url: 'https://linkedin.com/in/murilo-rodrigues-dev',
				icon: <LinkedinIcon className="size-4" />,
			},
			{
				id: 1,
				title: 'Github',
				url: 'https://github.com/draminhon',
				icon: <GithubIcon className="size-4" />,
			},
		],
	},
];

const designTeam: TeamMember[] = [
	{
		id: 0,
		name: 'Eduarda',
		links: [],
	},
	{
		id: 1,
		name: 'Dhyego',
		links: [],
	},
];

const computerVisionTeam: TeamMember[] = [
	{
		id: 0,
		name: 'Guilherme',
		links: [],
	},
];

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
						<TeamMembers teamMembers={coordinationTeam} />
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
							teamMembers={developmentTeam}
						/>
					</div>

					<div
						id="team-design-and-research"
						className="flex-1 rounded-xl p-6 bg-card flex flex-col gap-8"
					>
						<Heading.H2>
							{t('app.about/team.teams.design-title')}
						</Heading.H2>
						<TeamMembers teamMembers={designTeam} />
					</div>

					<div
						id="design-and-research"
						className="flex-1 rounded-xl p-6 bg-card flex flex-col gap-8"
					>
						<Heading.H2>
							{t('app.about/team.teams.computer-vision-title')}
						</Heading.H2>
						<TeamMembers teamMembers={computerVisionTeam} />
					</div>
				</section>
			</article>
		</InformativePageWrapper>
	);
}
