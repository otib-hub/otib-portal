import { LinkType } from '@/@types/link';
import { InformativePageWrapper } from '@/components/layout/InformativePageWrapper';
import { Heading } from '@/components/ui/heading';
import { getTranslations } from 'next-intl/server';

export default async function ResourcesPage() {
	const t = await getTranslations('');
	const breadcrumbs: LinkType[] = [
		{ title: t('meta.home.title'), url: '/otib' },
		{ title: t('meta.resources.title') },
	];

	return (
		<InformativePageWrapper breadcrumbLinks={breadcrumbs}>
			<main className="px-custom flex flex-col py-8 md:py-8 mb-10 md:mb-6 text-base md:text-lg space-y-6 lg:space-y-8">
				<Heading.H1>Recursos</Heading.H1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
					dicta quisquam laboriosam natus beatae error commodi
					voluptate optio quasi ea sequi doloremque explicabo ducimus
					impedit magnam iure magni architecto, reiciendis deserunt
					velit suscipit? Laborum, beatae.
				</p>
			</main>
		</InformativePageWrapper>
	);
}
