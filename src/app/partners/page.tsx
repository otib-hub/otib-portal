import { LinkType } from '@/@types/link';
import { InformativePageWrapper } from '@/components/layout/InformativePageWrapper';
import { Heading } from '@/components/ui/heading';
import { getTranslations } from 'next-intl/server';
import { PartnersCarousel } from './_components/PartnersCarousel';
import { Metadata } from 'next/types';
import { ContactBentoGrid } from './_components/ContactBentoGrid';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('meta.partners');
	return {
		title: 'OTIB - ' + t('title'),
	};
}

export default async function PartnersPage() {
	const t = await getTranslations('');
	const breadcrumbs: LinkType[] = [
		{ title: t('meta.home.title'), url: '/otib' },
		{ title: t('meta.partners.title') },
	];
	const partnersObjectives = [
		{
			id: 0,
			strong: t('app.partners.section#partners-heading.ul.li.0.strong'),
			text: t('app.partners.section#partners-heading.ul.li.0.text'),
		},
		{
			id: 1,
			strong: t('app.partners.section#partners-heading.ul.li.1.strong'),
			text: t('app.partners.section#partners-heading.ul.li.1.text'),
		},
		{
			id: 2,
			strong: t('app.partners.section#partners-heading.ul.li.2.strong'),
			text: t('app.partners.section#partners-heading.ul.li.2.text'),
		},
		{
			id: 3,
			strong: t('app.partners.section#partners-heading.ul.li.3.strong'),
			text: t('app.partners.section#partners-heading.ul.li.3.text'),
		},
	];

	return (
		<InformativePageWrapper breadcrumbLinks={breadcrumbs}>
			<article id="partners-content" className="flex flex-col space-y-8">
				<section
					id="partners-heading"
					className="flex flex-col space-y-6"
				>
					<Heading.H1>
						{t('app.partners.section#partners-heading.h1')}
					</Heading.H1>
					<p>{t('app.partners.section#partners-heading.p.0')}</p>
					<p>{t('app.partners.section#partners-heading.p.1')}</p>

					<ul className="list-disc list-inside marker:text-primary marker:text-2xl marker:font-bold">
						{partnersObjectives.map((objective) => (
							<li key={objective.id}>
								<p className="inline">
									<strong>{objective.strong}</strong>{' '}
									{objective.text}
								</p>
							</li>
						))}
					</ul>
				</section>

				<section
					id="partners-carousel"
					className="flex flex-col space-y-6"
				>
					<Heading.H2>
						{t('app.partners.section#partners-carousel.h2')}
					</Heading.H2>
					<div className="mx-10">
						<PartnersCarousel />
					</div>
				</section>

				<section
					id="partners-join-us"
					className="flex flex-col space-y-6"
				>
					<Heading.H2>
						{t('app.partners.section#join-us.h2')}
					</Heading.H2>
					<p>
						{t('app.partners.section#join-us.p.0')}{' '}
						{t('app.partners.section#join-us.p.1')}
					</p>

					<div className="flex flex-col gap-6 md:flex-row flex-wrap">
						<ContactBentoGrid t={t} />
					</div>
				</section>
			</article>
		</InformativePageWrapper>
	);
}
