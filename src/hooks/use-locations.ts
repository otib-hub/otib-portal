import { Option } from '@/components/ui/select-with-search';
import { IndividualResearchFormType } from '@/forms/IndividualResearchForm/schemas/individual-research-form-schema';
import { fetchCities } from '@/services/locations/fetch-cities';
import { fetchCountries } from '@/services/locations/fetch-countries';
import { fetchStates } from '@/services/locations/fetch-states';
import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

export function useLocations() {
	const { watch } = useFormContext<IndividualResearchFormType>();
	const selectedCountry = watch('tourist_country');
	const selectedState = watch('tourist_state');

	const [countries, setCountries] = useState<Option[] | []>([]);
	const [states, setStates] = useState<Option[] | []>([]);
	const [cities, setCities] = useState<Option[] | []>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const findLabelByValue = useCallback(
		(value: string, array: Array<Option>) => {
			const label = array.find((item) => item.value.match(value))?.label;
			return label;
		},
		[]
	);

	// Fetch countries on mount
	useEffect(() => {
		const fetchAndSetCountries = async () => {
			try {
				setIsLoading(true);
				const fetchedCountries = await fetchCountries();
				if (fetchedCountries) {
					setCountries(fetchedCountries);
				}
			} catch (error) {
				let errorMsg = 'Error fetching countries';
				if (error instanceof Error) errorMsg += `: ${error.message}`;
				console.error(errorMsg, error);
				toast.error(errorMsg);

				setCountries([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAndSetCountries();
	}, []);

	// Fetch states when country changes
	useEffect(() => {
		const fetchAndSetStates = async () => {
			try {
				setIsLoading(true);
				if (!selectedCountry) {
					setStates([]);
					return;
				}

				const countryLabel = findLabelByValue(selectedCountry, countries);
				if (!countryLabel) {
					setStates([]);
					return;
				}

				const fetchedStates = await fetchStates(countryLabel);
				setStates(fetchedStates);
			} catch (error) {
				let errorMsg = 'Error fetching states';
				if (error instanceof Error) errorMsg += `: ${error.message}`;
				console.error(errorMsg, error);
				toast.error(errorMsg);

				setStates([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAndSetStates();
	}, [selectedCountry, findLabelByValue, countries]);

	// Fetch cities when state changes
	useEffect(() => {
		const fetchAndSetCities = async () => {
			try {
				setIsLoading(true);
				if (!selectedCountry || !selectedState) {
					setCities([]);
					return;
				}

				const countryLabel = findLabelByValue(selectedCountry, countries);
				const stateLabel = findLabelByValue(selectedState, states);
				if (!countryLabel || !stateLabel) {
					setCities([]);
					return;
				}

				const fetchedCities = await fetchCities(countryLabel, stateLabel);
				setCities(fetchedCities);
			} catch (error) {
				let errorMsg = 'Error fetching cities';
				if (error instanceof Error) errorMsg += `: ${error.message}`;
				console.error(errorMsg, error);
				toast.error(errorMsg);

				setCities([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAndSetCities();
	}, [selectedCountry, selectedState, findLabelByValue, countries, states]);

	return {
		countries: {
			options: countries,
			isLoading,
		},
		states: {
			options: states,
			isLoading,
		},
		cities: {
			options: cities,
			isLoading,
		},
	};
}
