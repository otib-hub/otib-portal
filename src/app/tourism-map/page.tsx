import { Metadata } from 'next';
import { Heading } from '@/components/ui/heading';

import { InformativePageWrapper } from '@/components/layout/InformativePageWrapper';
import { LinkType } from '@/@types/link';
import { InteractiveMap } from './_components/InteractiveMap';
import { getTranslations } from 'next-intl/server';
import { MapHelpDialog } from './_components/MapHelpDialog';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('meta.tourism-map');
	return {
		title: 'OTIB - ' + t('title'),
	};
}

export default async function TourismMapPage() {
	const t = await getTranslations();

	const breadcrumbs: LinkType[] = [
		{ title: t('meta.home.title'), url: '/otib' },
		{ title: t('meta.tourism-map.title') },
	];

	return (
		<InformativePageWrapper breadcrumbLinks={breadcrumbs}>
			<div className="bg-background relative rounded-2xl w-full flex flex-col items-start justify-start gap-10">
				<span className="inline-flex justify-center items-center gap-4">
					<Heading.H1>{t('app.tourism-map.title')}</Heading.H1>
					<MapHelpDialog />
				</span>
				<InteractiveMap />
			</div>
		</InformativePageWrapper>
	);
}
