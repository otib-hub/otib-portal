import { CityImage } from './city-image';

type TourismStatistic = {
	id: number;
	name: string;
	value: number;
};

export type CityTouristicData = {
	id: number;
	name: string;
	images: CityImage[];
	companiesData: TourismStatistic[];
};
