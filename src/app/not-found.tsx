import { Metadata } from 'next/types';
import { getTranslations } from 'next-intl/server';
import { NotFound } from './_components/NotFound';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('meta.not-found');
	return {
		title: 'OTIB - ' + t('title'),
	};
}

export default function NotFoundPage() {
	return <NotFound />;
}
