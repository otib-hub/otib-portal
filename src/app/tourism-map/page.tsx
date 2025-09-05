import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TourismMap from './client-page';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('meta.tourism-map');
	return {
		title: 'OTIB - ' + t('title'),
	};
}

export default async function TourismMapPage() {
	return <TourismMap />;
}
