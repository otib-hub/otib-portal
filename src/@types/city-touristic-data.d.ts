import { CityImage } from './city-image';

export type CityTouristicData = {
	id: string | number;
	name: string;
	images: CityImage[];
	companiesData: {
		totalTourismCompanies: number;
		registeredCadasturCompanies: number;
		foodServices: number;
		touristTransport: number;
		lodging: number;
		travelAgencies: number;
		eventOrganizers: number;
		tourGuidesAndOperators: number;
		touristCamps: number;
		themeParks: number;
	};
};
