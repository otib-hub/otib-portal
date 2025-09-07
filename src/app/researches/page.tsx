import { LinkType } from '@/@types/link';
import { InformativePageWrapper } from '@/components/layout/InformativePageWrapper';
import { Heading } from '@/components/ui/heading';
import { getTranslations } from 'next-intl/server';

export default async function ResearchesPage() {
	const t = await getTranslations('');
	const breadcrumbs: LinkType[] = [
		{ title: t('meta.home.title'), url: '/otib' },
		{ title: t('meta.researches.title') },
	];

	return (
		<InformativePageWrapper breadcrumbLinks={breadcrumbs}>
			<main className="px-custom flex flex-col py-8 md:py-8 mb-10 md:mb-6 text-base md:text-lg space-y-6 lg:space-y-8">
				<Heading.H1>{t('meta.researches.title')}</Heading.H1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Repellendus reiciendis optio quia culpa iste. Asperiores,
					voluptates? Veritatis sequi eos reprehenderit culpa iste
					corrupti velit, recusandae ipsam similique accusamus animi
					quo. Quo delectus officiis earum dolorum.
				</p>
			</main>
		</InformativePageWrapper>
	);
}
