import { LinkType } from '@/@types/link';
import { Footer } from '@/components/layout/Footer';
import { InformativePageWrapper } from '@/components/layout/InformativePageWrapper';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { Heading } from '@/components/ui/heading';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Member } from './_components/Member';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { GithubIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('meta.about/team');
	return {
		title: 'OTIB - ' + t('title'),
	};
}

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
						<Heading.H2>Project Coordination</Heading.H2>
						<div className="flex items-start justify-center gap-6">
							<Member
								name="Nécio Veras"
								profilePhoto="https://avatars.githubusercontent.com/u/129892?v=4"
							>
								<Link
									className={buttonVariants({
										variant: 'secondary',
									})}
									href={'https://linkedin.com/in/necioveras'}
									target="_blank"
									rel="noopener"
								>
									<LinkedinIcon className="size-4" />
								</Link>

								<Link
									className={buttonVariants({
										variant: 'secondary',
									})}
									href={'https://instagram.com/necioveras'}
									target="_blank"
									rel="noopener"
								>
									<InstagramIcon className="size-4" />
								</Link>

								<Link
									className={buttonVariants({
										variant: 'secondary',
									})}
									href={'https://github.com/necioveras'}
									target="_blank"
									rel="noopener"
								>
									<GithubIcon className="size-4" />
								</Link>
							</Member>
						</div>
					</div>

					<div
						id="team-devs"
						className="w-full md:w-fit rounded-xl p-6 bg-card flex flex-col gap-8"
					>
						<Heading.H2>Devs</Heading.H2>
						<div className="flex flex-row flex-wrap items-center justify-center gap-6">
							<Member
								name="Manuel Carlos"
								description="Front-end"
								profilePhoto="https://avatars.githubusercontent.com/u/110443154?v=4"
							>
								<Link
									className={buttonVariants({
										variant: 'secondary',
									})}
									href={'https://linkedin.com/in/1manuelc'}
									target="_blank"
									rel="noopener"
								>
									<LinkedinIcon className="size-4" />
								</Link>

								<Link
									className={buttonVariants({
										variant: 'secondary',
									})}
									href={'https://instagram.com/1manuelc'}
									target="_blank"
									rel="noopener"
								>
									<InstagramIcon className="size-4" />
								</Link>

								<Link
									className={buttonVariants({
										variant: 'secondary',
									})}
									href={'https://github.com/1manuelc'}
									target="_blank"
									rel="noopener"
								>
									<GithubIcon className="size-4" />
								</Link>
							</Member>

							<Member
								name="Murilo Rodrigues"
								description="Back-end"
								profilePhoto="https://media.licdn.com/dms/image/v2/D4D03AQEca5C5XmsVyQ/profile-displayphoto-shrink_400_400/B4DZRlZiRXHEAg-/0/1736867980852?e=1760572800&v=beta&t=UaRm2z16gLAR9anMl4UBmcrlSKpqZctnPvqoYsw_cQs"
							>
								<Link
									className={buttonVariants({
										variant: 'secondary',
									})}
									href={
										'https://www.linkedin.com/in/murilo-rodrigues-dev/'
									}
									target="_blank"
									rel="noopener"
								>
									<LinkedinIcon className="size-4" />
								</Link>

								<Link
									className={buttonVariants({
										variant: 'secondary',
									})}
									href={'https://instagram.com/notfound'} // TODO: atualizar redes sociais dos membros do time
									target="_blank"
									rel="noopener"
								>
									<InstagramIcon className="size-4" />
								</Link>

								<Link
									className={buttonVariants({
										variant: 'secondary',
									})}
									href={'https://github.com/draminhon'}
									target="_blank"
									rel="noopener"
								>
									<GithubIcon className="size-4" />
								</Link>
							</Member>
						</div>
					</div>

					<div
						id="team-design-and-research"
						className="flex-1 rounded-xl p-6 bg-card flex flex-col gap-8"
					>
						<Heading.H2>Design & Research</Heading.H2>
						<div className="flex items-start justify-center gap-6">
							<Member name="Eduarda"></Member>
							<Member name="Dhyego"></Member>
						</div>
					</div>

					<div
						id="design-and-research"
						className="flex-1 rounded-xl p-6 bg-card flex flex-col gap-8"
					>
						<Heading.H2>Computer Vision</Heading.H2>
						<div className="flex items-start justify-center gap-6">
							<Member name="Guilherme Carneiro"></Member>
						</div>
					</div>
				</section>
			</article>

			<Footer />
		</InformativePageWrapper>
	);
}
