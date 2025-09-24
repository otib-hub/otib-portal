'use client';

import dynamic from 'next/dynamic';
import { Suspense, useCallback, useMemo, useState } from 'react';

import { CityTouristicData } from '@/@types/city-touristic-data';
import { getCityTouristicData } from './touristic-data';
import { CityDataTabs } from './CityDataTabs';
import { RevealOnScroll } from '@/components/layout/RevealOnScroll';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';

const LazyIbiapabaMap = dynamic(
	() => import('@/components/layout/IbiapabaMap'),
	{
		ssr: false,
		loading: () => (
			<Skeleton className="w-full md:w-[30%] min-h-[400px] md:min-h-[436px] lg:min-h-[512px] rounded-2xl flex items-center justify-center">
				<Spinner />
			</Skeleton>
		),
	},
);

const LazyCityHighlightsCarousel = dynamic(
	() => import('./CityHighlightsCarousel'),
	{
		ssr: false,
		loading: () => (
			<Skeleton className="max-w-184 min-h-134 lg:min-h-138 flex-1 rounded-2xl flex items-center justify-center">
				<Spinner />
			</Skeleton>
		),
	},
);

export function InteractiveMap() {
	const [selectedCity, setSelectedCity] = useState<string | undefined>(
		undefined,
	);

	const selectedCityTouristicData: CityTouristicData = useMemo(
		() => getCityTouristicData(selectedCity),
		[selectedCity],
	);

	const handleCityChange = useCallback((city: string | undefined) => {
		setSelectedCity(city);
	}, []);

	return (
		<div id="map-container" className="w-full flex flex-col gap-8">
			<div
				id="map-principal-row"
				className="w-full mx-0 flex flex-col md:flex-row md:justify-between gap-8"
			>
				<Suspense>
					<LazyIbiapabaMap
						selected={selectedCity}
						onChangeSelected={handleCityChange}
					/>
				</Suspense>

				<Suspense>
					<LazyCityHighlightsCarousel
						selectedCity={selectedCity}
						data={selectedCityTouristicData}
					/>
				</Suspense>
			</div>

			<RevealOnScroll>
				<CityDataTabs
					city={selectedCity}
					cityTouristicData={selectedCityTouristicData}
				/>
			</RevealOnScroll>
		</div>
	);
}
