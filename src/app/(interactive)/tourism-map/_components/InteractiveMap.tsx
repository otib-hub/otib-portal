'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';

import { CityHighlightsCarousel } from './CityHighlightsCarousel';
import { CityTouristicData } from '@/@types/city-touristic-data';
import { getCityTouristicData } from './touristic-data';
import { CityDataTabs } from './CityDataTabs';
import { RevealOnScroll } from '@/components/layout/RevealOnScroll';

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

export function InteractiveMap() {
	const [selectedCity, setSelectedCity] = useState<string | undefined>(
		undefined,
	);

	const selectedCityTouristicData: CityTouristicData =
		getCityTouristicData(selectedCity);

	const handleCityChange = useCallback((city: string | undefined) => {
		setSelectedCity(city);
	}, []);

	return (
		<div id="map-container" className="w-full flex flex-col gap-8">
			<div
				id="map-principal-row"
				className="w-full mx-0 flex flex-col md:flex-row md:justify-between gap-8"
			>
				<LazyIbiapabaMap
					selected={selectedCity}
					onChangeSelected={handleCityChange}
				/>
				<CityHighlightsCarousel
					selectedCity={selectedCity}
					data={selectedCityTouristicData}
				/>
			</div>

			{/* TODO: investigar excesso de renderizações ao trocar cidade selecionada */}

			<RevealOnScroll>
				<CityDataTabs
					city={selectedCity}
					cityTouristicData={selectedCityTouristicData}
				/>
			</RevealOnScroll>
		</div>
	);
}
