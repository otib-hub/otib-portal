import { Option } from '@/components/ui/select-with-search';
import { fetchCities } from '@/services/locations/fetch-cities';
import { fetchCountries } from '@/services/locations/fetch-countries';
import { fetchStates } from '@/services/locations/fetch-states';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export function useLocations({
	selectedCountry,
	selectedState,
}: {
	selectedCountry?: string;
	selectedState?: string;
}) {
	const {
		data: countries = [],
		isLoading: isLoadingCountries,
		error: errorCountries,
	} = useQuery({
		queryKey: ['countries'],
		queryFn: fetchCountries,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: 2,
	});

	const countryLabelMap = React.useMemo(() => {
		const map = new Map<string, string>();
		countries.forEach(({ value, label }: Option) => map.set(value, label));
		return map;
	}, [countries]);

	const {
		data: states = [],
		isLoading: isLoadingStates,
		error: errorStates,
	} = useQuery({
		queryKey: ['states', selectedCountry],
		queryFn: () => {
			if (!selectedCountry) return Promise.resolve([]);
			const countryLabel = countryLabelMap.get(selectedCountry);
			return countryLabel ? fetchStates(countryLabel) : Promise.resolve([]);
		},
		enabled: !!selectedCountry,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: 2,
	});

	const stateLabelMap = React.useMemo(() => {
		const map = new Map<string, string>();
		states.forEach(({ value, label }: Option) => map.set(value, label));
		return map;
	}, [states]);

	const {
		data: cities = [],
		isLoading: isLoadingCities,
		error: errorCities,
	} = useQuery({
		queryKey: ['cities', selectedCountry, selectedState],
		queryFn: () => {
			if (!selectedCountry || !selectedState) return Promise.resolve([]);

			const countryLabel = countryLabelMap.get(selectedCountry);
			const stateLabel = stateLabelMap.get(selectedState);

			return countryLabel && stateLabel
				? fetchCities(countryLabel, stateLabel)
				: Promise.resolve([]);
		},
		enabled: !!selectedCountry && !!selectedState,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: 2,
	});

	return {
		countries: {
			options: countries,
			isLoading: isLoadingCountries,
			error: errorCountries,
		},
		states: {
			options: states,
			isLoading: isLoadingStates,
			error: errorStates,
		},
		cities: {
			options: cities,
			isLoading: isLoadingCities,
			error: errorCities,
		},
	};
}
