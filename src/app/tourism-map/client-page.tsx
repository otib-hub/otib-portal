'use client';

import { Heading } from '@/components/ui/heading';
import { Footer } from '@/components/layout/Footer';
import { InteractiveMapCard } from '@/components/fragments/InteractiveMapCard';
import { useState } from 'react';
import { InformativePageWrapper } from '@/components/layout/InformativePageWrapper';
import { useTranslations } from 'next-intl';
import { LinkType } from '@/@types/link';

export default function TourismMap() {
	const [selectedCity, setSelectedCity] = useState<string | undefined>(
		undefined,
	);
	const t = useTranslations();

	const breadcrumbs: LinkType[] = [
		{
			title: t('meta.home.title'),
			url: '/otib',
		},
		{
			title: t('meta.tourism-map.title'),
			url: '/tourism-map',
		},
	];

	return (
		<InformativePageWrapper breadcrumbLinks={breadcrumbs}>
			<main className="mt-6 bg-background relative px-custom rounded-2xl w-full flex flex-col items-start justify-start gap-10">
				<Heading.H1>{t('app.tourism-map.title')}</Heading.H1>
				<InteractiveMapCard
					selectedCity={selectedCity}
					setSelectedCity={setSelectedCity}
				/>
			</main>

			<Footer />
		</InformativePageWrapper>
	);
}
