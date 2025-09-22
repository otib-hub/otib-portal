import type { CityImage } from '@/@types/city-image';

import default_0 from '#/images/cities/default/0.png';
import default_1 from '#/images/cities/default/1.png';
import default_2 from '#/images/cities/default/2.png';

import tiangua_0 from '#/images/cities/tiangua/0.png';
import tiangua_1 from '#/images/cities/tiangua/1.png';
import tiangua_2 from '#/images/cities/tiangua/2.png';
import tiangua_3 from '#/images/cities/tiangua/3.png';

import croata_0 from '#/images/cities/croata/0.png';
import croata_1 from '#/images/cities/croata/1.png';
import croata_2 from '#/images/cities/croata/2.png';
import croata_3 from '#/images/cities/croata/3.png';

import ubajara_0 from '#/images/cities/ubajara/0.png';
import ubajara_1 from '#/images/cities/ubajara/1.png';
import ubajara_2 from '#/images/cities/ubajara/2.png';
import ubajara_3 from '#/images/cities/ubajara/3.png';

import carnaubal_0 from '#/images/cities/carnaubal/0.png';
import carnaubal_1 from '#/images/cities/carnaubal/1.png';
import carnaubal_2 from '#/images/cities/carnaubal/2.png';
import carnaubal_3 from '#/images/cities/carnaubal/3.png';

import guaraciaba_0 from '#/images/cities/guaraciaba-do-norte/0.png';
import guaraciaba_1 from '#/images/cities/guaraciaba-do-norte/1.png';
import guaraciaba_2 from '#/images/cities/guaraciaba-do-norte/2.png';
import guaraciaba_3 from '#/images/cities/guaraciaba-do-norte/3.png';

import ipu_0 from '#/images/cities/ipu/0.png';
import ipu_1 from '#/images/cities/ipu/1.png';
import ipu_2 from '#/images/cities/ipu/2.png';
import ipu_3 from '#/images/cities/ipu/3.png';

import sb_0 from '#/images/cities/sao-benedito/0.png';
import sb_1 from '#/images/cities/sao-benedito/1.png';
import sb_2 from '#/images/cities/sao-benedito/2.png';
import sb_3 from '#/images/cities/sao-benedito/3.png';

import vicosa_0 from '#/images/cities/vicosa-do-ceara/0.png';
import vicosa_1 from '#/images/cities/vicosa-do-ceara/1.png';
import vicosa_2 from '#/images/cities/vicosa-do-ceara/2.png';
import vicosa_3 from '#/images/cities/vicosa-do-ceara/3.png';

import ibiapina_0 from '#/images/cities/ibiapina/0.png';
import ibiapina_1 from '#/images/cities/ibiapina/1.png';
import ibiapina_2 from '#/images/cities/ibiapina/2.png';
import ibiapina_3 from '#/images/cities/ibiapina/3.png';
import { StaticImageData } from 'next/image';

export enum CitiesENUM {
	CROATA = 'croata',
	CARNAUBAL = 'carnaubal',
	GBA = 'guaraciaba-do-norte',
	IPU = 'ipu',
	SB = 'sao-benedito',
	UBAJARA = 'ubajara',
	VICOSA = 'vicosa-do-ceara',
	TIANGUA = 'tiangua',
	IBIAPINA = 'ibiapina',
}

function makeImageSet(city: string, imgs: StaticImageData[]) {
	return imgs.map((img, i) => ({
		id: i,
		slug: `${city}_${i}`,
		img,
		description: `city (${i})`,
	}));
}

export const citiesBackgrounds = {
	default: makeImageSet('default', [default_0, default_1, default_2]),
	croata: makeImageSet('croata', [croata_0, croata_1, croata_2, croata_3]),
	carnaubal: makeImageSet('carnaubal', [
		carnaubal_0,
		carnaubal_1,
		carnaubal_2,
		carnaubal_3,
	]),
	['guaraciaba-do-norte']: makeImageSet('guaraciaba-do-norte', [
		guaraciaba_0,
		guaraciaba_1,
		guaraciaba_2,
		guaraciaba_3,
	]),
	ipu: makeImageSet('ipu', [ipu_0, ipu_1, ipu_2, ipu_3]),
	['sao-benedito']: makeImageSet('sao-benedito', [sb_0, sb_1, sb_2, sb_3]),
	ubajara: makeImageSet('ubajara', [
		ubajara_0,
		ubajara_1,
		ubajara_2,
		ubajara_3,
	]),
	['vicosa-do-ceara']: makeImageSet('vicosa-do-ceara', [
		vicosa_0,
		vicosa_1,
		vicosa_2,
		vicosa_3,
	]),
	tiangua: makeImageSet('tiangua', [
		tiangua_0,
		tiangua_1,
		tiangua_2,
		tiangua_3,
	]),
	ibiapina: makeImageSet('ibiapina', [
		ibiapina_0,
		ibiapina_1,
		ibiapina_2,
		ibiapina_3,
	]),
} as const;

export function getCityImage(
	cityName: CitiesENUM | 'default',
	imageId: number,
	options?: Partial<CityImage>,
): CityImage {
	const cityKey = cityName ?? 'default';
	const image =
		citiesBackgrounds[cityKey as keyof typeof citiesBackgrounds][imageId];
	return {
		src: image.img,
		alt: image.description,
		title: image.description,
		slug: image.slug,
		blurDataURL: image.img.blurDataURL,
		width: image.img.width,
		height: image.img.height,
		...options,
	};
}
