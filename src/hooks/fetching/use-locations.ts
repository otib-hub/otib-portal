import { Option } from '@/components/ui/select-with-search';
import { fetchCities } from '@/actions/locations/fetch-cities';
import { fetchCountries } from '@/actions/locations/fetch-countries';
import { fetchStates } from '@/actions/locations/fetch-states';
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

	const countryValueMap = React.useMemo(() => {
		const map = new Map<string, string>();
		countries.forEach(({ value }: Option) => map.set(value, value));
		return map;
	}, [countries]);

	const {
		data: states = [],
		isLoading: isLoadingStates,
		error: errorStates,
	} = useQuery({
		queryKey: ['states', selectedCountry],
		queryFn: () => {
			if (!selectedCountry) {
				return Promise.resolve([]);
			}

			const countryLabel = countryValueMap.get(selectedCountry);
			return countryLabel ? fetchStates(countryLabel) : Promise.resolve([]);
		},
		enabled: !!selectedCountry,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: 2,
	});

	const stateValueMap = React.useMemo(() => {
		const map = new Map<string, string>();
		states.forEach(({ value }: Option) => map.set(value, value));
		return map;
	}, [states]);

	const {
		data: cities = [],
		isLoading: isLoadingCities,
		error: errorCities,
	} = useQuery({
		queryKey: ['cities', selectedCountry, selectedState],
		queryFn: () => {
			if (!selectedCountry || !selectedState) {
				return Promise.resolve([]);
			}

			const countryValue = countryValueMap.get(selectedCountry);
			const stateValue = stateValueMap.get(selectedState);

			return countryValue && stateValue
				? fetchCities(countryValue, stateValue)
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
