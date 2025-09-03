'use client';

import { InteractiveMapCard } from '@/components/fragments/InteractiveMapCard';
import { useState } from 'react';

export function HeroMap() {
	const [selectedCity, setSelectedCity] = useState<string | undefined>(
		undefined,
	);
    
	return (
		<InteractiveMapCard
			selectedCity={selectedCity}
			setSelectedCity={setSelectedCity}
		/>
	);
}
