import croata_full from '#/images/cities/full/croata_full.png';
import carnaubal_full from '#/images/cities/full/carnaubal_full.png';
import guaraciaba_full from '#/images/cities/full/guaraciaba_full.png';
import ipu_full from '#/images/cities/full/ipu_full.png';
import sao_benedito_full from '#/images/cities/full/sao-benedito_full.png';
import ubajara_full from '#/images/cities/full/ubajara_full.png';
import vicosa_full from '#/images/cities/full/vicosa_full.png';

import croata_square from '#/images/cities/square/croata_square.png';
import carnaubal_square from '#/images/cities/square/carnaubal_square.png';
import guaraciaba_square from '#/images/cities/square/guaraciaba_square.png';
import ipu_square from '#/images/cities/square/ipu_square.png';
import sao_benedito_square from '#/images/cities/square/sao-benedito_square.png';
import ubajara_square from '#/images/cities/square/ubajara_square.png';
import vicosa_square from '#/images/cities/square/vicosa_square.png';

import default_full_img from '#/images/highlights_5.webp';
import { convertToSlug } from '@/utils/convert-to-slug';

export const citiesBackgrounds = {
	croata: { full: croata_full, square: croata_square },
	carnaubal: { full: carnaubal_full, square: carnaubal_square },
	'guaraciaba-do-norte': { full: guaraciaba_full, square: guaraciaba_square },
	ipu: { full: ipu_full, square: ipu_square },
	'sao-benedito': { full: sao_benedito_full, square: sao_benedito_square },
	ubajara: { full: ubajara_full, square: ubajara_square },
	'vicosa-do-ceara': { full: vicosa_full, square: vicosa_square },
	default: { full: ubajara_full, square: default_full_img },
} as const;

export function getCityBackground(
	isMobile: boolean,
	selectedCity: string | undefined,
) {
	const backgroundType = isMobile ? 'square' : 'full';

	if (!selectedCity) {
		return citiesBackgrounds.default[backgroundType];
	}

	const slug = convertToSlug(selectedCity);
	if (slug in citiesBackgrounds) {
		return citiesBackgrounds[slug as keyof typeof citiesBackgrounds][
			backgroundType
		];
	}

	return citiesBackgrounds.default[backgroundType];
}
