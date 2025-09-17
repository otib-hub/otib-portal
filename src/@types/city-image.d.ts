import { ImageProps } from 'next/image';

export type CityImage = ImageProps & {
	title: string;
	slug: string;
};
