'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';

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

export function InteractiveMap() {
	const [selectedCity, setSelectedCity] = useState<string | undefined>(
		undefined,
	);

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
		<>
			<LazyIbiapabaMap
				selected={selectedCity}
				onChangeSelected={handleCityChange}
			/>
			<div className="flex-1 rounded-2xl bg-card flex items-center justify-center text-muted-foreground">
				{selectedCity ?? 'Selecione uma cidade'}
			</div>
		</>
	);
}
