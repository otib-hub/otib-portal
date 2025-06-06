import { TFunction } from '@/@types/next-intl';
import { objectToSelectOptions } from '@/utils/object-to-select-options';
import { z } from 'zod';

export function getProfileStepSchema(t: TFunction<'forms'>) {
	return z.object({
		tourist_country: z.string({ required_error: t('errors.field_required') }),
		tourist_state: z.string({ required_error: t('errors.field_required') }),
		tourist_city: z.string({ required_error: t('errors.field_required') }),

		tourist_age_group: z.string({ required_error: t('errors.field_required') }),
		tourist_gender: z.string({ required_error: t('errors.field_required') }),

		tourist_education: z.string({ required_error: t('errors.field_required') }),
		tourist_estimated_income: z.string({
			required_error: t('errors.field_required'),
		}),
	});
}

export function getProfileStepSelectOptions(
	t: TFunction<'forms.ExampleForm.steps.1.fields'>
) {
	const localizationOptions = {
		tourist_country: {
			br: 'Brasil',
			ar: 'Argentina',
			de: 'Germany',
			fr: 'France',
		},
		tourist_state: {
			SP: 'São Paulo',
			RJ: 'Rio de Janeiro',
			MG: 'Minas Gerais',
			RS: 'Rio Grande do Sul',
		},
		tourist_city: {
			sao_paulo: 'São Paulo',
			rio: 'Rio de Janeiro',
			bh: 'Belo Horizonte',
			poa: 'Porto Alegre',
		},
	} as const; // TODO: fetch de localizações

	return {
		localization: {
			tourist_country: objectToSelectOptions(
				localizationOptions.tourist_country
			),
			tourist_state: objectToSelectOptions(localizationOptions.tourist_state),
			tourist_city: objectToSelectOptions(localizationOptions.tourist_city),
		},
		personal: {
			tourist_age_group: objectToSelectOptions({
				'1': t('tourist_age_group.options.0'),
				'2': t('tourist_age_group.options.1'),
				'3': t('tourist_age_group.options.2'),
				'4': t('tourist_age_group.options.3'),
				'5': t('tourist_age_group.options.4'),
				'6': t('tourist_age_group.options.5'),
			}),
			tourist_gender: objectToSelectOptions({
				male: t('tourist_gender.options.male'),
				female: t('tourist_gender.options.female'),
				non_binary: t('tourist_gender.options.non_binary'),
				other: t('tourist_gender.options.other'),
				omit: t('tourist_gender.options.omit'),
			}),
		},
		improvement: {
			tourist_education: objectToSelectOptions({
				'1': t('tourist_education.options.0'),
				'2': t('tourist_education.options.1'),
				'3': t('tourist_education.options.2'),
				'4': t('tourist_education.options.3'),
				'5': t('tourist_education.options.4'),
				'6': t('tourist_education.options.5'),
			}),
			tourist_estimated_income: objectToSelectOptions({
				low: t('tourist_estimated_income.options.low'),
				low_mid: t('tourist_estimated_income.options.low_mid'),
				mid: t('tourist_estimated_income.options.mid'),
				high_mid: t('tourist_estimated_income.options.high_mid'),
				high: t('tourist_estimated_income.options.high'),
				omit: t('tourist_estimated_income.options.omit'),
			}),
		},
	};
}

export type ProfileStepType = z.infer<ReturnType<typeof getProfileStepSchema>>;
