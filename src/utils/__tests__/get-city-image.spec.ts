import { describe, it, expect } from 'vitest';
import { getCityImage, citiesBackgrounds, CitiesENUM } from '../get-city-image';

describe('getCityImage() - unit tests', () => {
	it('should return a CityImage object for a valid city enum (isMobile true)', () => {
		const result = getCityImage(true, CitiesENUM.TIANGUA);
		expect(result).toMatchObject({
			src: citiesBackgrounds.tiangua.square,
			alt: citiesBackgrounds.tiangua.description,
			title: citiesBackgrounds.tiangua.description,
			slug: citiesBackgrounds.tiangua.slug,
			width: citiesBackgrounds.tiangua.square.width,
			height: citiesBackgrounds.tiangua.square.height,
		});
	});

	it('should return a CityImage object for a valid city enum (isMobile false)', () => {
		const result = getCityImage(false, CitiesENUM.TIANGUA);
		expect(result).toMatchObject({
			src: citiesBackgrounds.tiangua.full,
			alt: citiesBackgrounds.tiangua.description,
			title: citiesBackgrounds.tiangua.description,
			slug: citiesBackgrounds.tiangua.slug,
			width: citiesBackgrounds.tiangua.full.width,
			height: citiesBackgrounds.tiangua.full.height,
		});
	});

	it('should allow overriding properties via options', () => {
		const result = getCityImage(true, CitiesENUM.UBAJARA, {
			alt: 'Custom alt',
			priority: true,
			loading: 'eager',
		});
		expect(result.alt).toBe('Custom alt');
		expect(result.priority).toBe(true);
		expect(result.loading).toBe('eager');
	});

	it('should return correct images for all valid city enums (isMobile true)', () => {
		Object.values(CitiesENUM).forEach((cityKey) => {
			const result = getCityImage(true, cityKey);
			const city =
				citiesBackgrounds[cityKey as keyof typeof citiesBackgrounds];
			expect(result?.src).toBe(city.square);
		});
	});

	it('should return correct images for all valid city enums (isMobile false)', () => {
		Object.values(CitiesENUM).forEach((cityKey) => {
			const result = getCityImage(false, cityKey);
			const city =
				citiesBackgrounds[cityKey as keyof typeof citiesBackgrounds];
			expect(result?.src).toBe(city.full);
		});
	});
});
