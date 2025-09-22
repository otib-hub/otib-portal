import { describe, it, expect } from 'vitest';
import { getCityImage, citiesBackgrounds, CitiesENUM } from '../get-city-image';

describe('getCityImage() - unit tests', () => {
	it('should return a CityImage object for a valid city and image index', () => {
		const result = getCityImage(CitiesENUM.TIANGUA, 0);

		expect(result).toMatchObject({
			src: citiesBackgrounds.tiangua[0].img,
			alt: citiesBackgrounds.tiangua[0].description,
			title: citiesBackgrounds.tiangua[0].description,
			slug: citiesBackgrounds.tiangua[0].slug,
			width: citiesBackgrounds.tiangua[0].img.width,
			height: citiesBackgrounds.tiangua[0].img.height,
		});
	});

	it('should allow overriding properties via options', () => {
		const result = getCityImage(CitiesENUM.UBAJARA, 1, {
			alt: 'Custom alt',
			priority: true,
			loading: 'eager',
		});

		expect(result.alt).toBe('Custom alt');
		expect(result.priority).toBe(true);
		expect(result.loading).toBe('eager');
	});

	it('should return correct images for all valid city enums', () => {
		Object.values(CitiesENUM).forEach((cityKey) => {
			const citySet =
				citiesBackgrounds[cityKey as keyof typeof citiesBackgrounds];
			citySet.forEach((cityImage, i) => {
				const result = getCityImage(cityKey, i);
				expect(result?.src).toBe(cityImage.img);
				expect(result?.slug).toBe(cityImage.slug);
			});
		});
	});

	it('should return default images when city is "default"', () => {
		const result = getCityImage('default', 2);

		expect(result).toMatchObject({
			src: citiesBackgrounds.default[2].img,
			alt: citiesBackgrounds.default[2].description,
			title: citiesBackgrounds.default[2].description,
			slug: citiesBackgrounds.default[2].slug,
		});
	});

	it('should throw if the imageId is out of range', () => {
		expect(() => getCityImage(CitiesENUM.TIANGUA, 999)).toThrowError();
	});
});
