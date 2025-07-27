import { TFunction } from '@/@types/next-intl';
import { objectToSelectOptions } from '@/utils/object-to-select-options';
import { z } from 'zod';

export function getProfileStepSchema(t: TFunction<'forms'>) {
	return z.object({
		tourist_country: z.string({ message: t('errors.field_required') }),
		tourist_state: z.string({ message: t('errors.field_required') }),
		tourist_city: z.string({ message: t('errors.field_required') }),

		tourist_age_group: z.string({ message: t('errors.field_required') }),
		tourist_gender: z.string({ message: t('errors.field_required') }),

		tourist_education: z.string({ message: t('errors.field_required') }),
		tourist_estimated_income: z.string({
			message: t('errors.field_required'),
		}),
	});
}

export function getProfileStepSelectOptions(
	t: TFunction<'forms.TouristIndividualResearchForm.steps.1.fields'>
) {
	return {
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
				'7': t('tourist_education.options.6'),
				'8': t('tourist_education.options.7'),
				'9': t('tourist_education.options.8'),
				'10': t('tourist_education.options.9'),
				'11': t('tourist_education.options.10'),
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
