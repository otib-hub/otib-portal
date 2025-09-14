'use client';

import { Heading } from '@/components/ui/heading';
import { useCallback, useState } from 'react';
import { InformativePageWrapper } from '@/components/layout/InformativePageWrapper';
import { useTranslations } from 'next-intl';
import { LinkType } from '@/@types/link';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { convertToSlug } from '@/utils/convert-to-slug';

const LazyIbiapabaMap = dynamic(
	() => import('@/components/layout/IbiapabaMap'),
	{
		ssr: false,
		loading: () => (
			<Skeleton className="w-full md:w-[30%] min-h-[400px] md:min-h-[436px] lg:min-h-[512px] rounded-2xl flex items-center justify-center bg-transparent">
				<Spinner />
			</Skeleton>
		),
	},
);

export default function TourismMap() {
	const [selectedCity, setSelectedCity] = useState<string | undefined>(
		undefined,
	);
	const t = useTranslations();

	const breadcrumbs: LinkType[] = [
		{ title: t('meta.home.title'), url: '/otib' },
		{ title: t('meta.tourism-map.title') },
	];

	const handleCityChange = useCallback(
		(city: string | undefined) => {
			if (city) {
				const formatted = convertToSlug(city.toLowerCase());
				setSelectedCity(formatted);
			} else {
				setSelectedCity(undefined);
			}
		},
		[setSelectedCity],
	);

	return (
		<InformativePageWrapper breadcrumbLinks={breadcrumbs}>
			<div className="bg-background relative rounded-2xl w-full flex flex-col items-start justify-start gap-10">
				<Heading.H1>{t('app.tourism-map.title')}</Heading.H1>

				<div className="w-full h-full flex flex-col md:flex-row gap-8">
					<LazyIbiapabaMap
						selected={selectedCity}
						onChangeSelected={handleCityChange}
					/>
					<div className="flex-1 rounded-2xl bg-card flex items-center justify-center text-muted-foreground">
						{selectedCity ?? 'Selecione uma cidade'}
					</div>
				</div>
			</div>
		</InformativePageWrapper>
	);
}
