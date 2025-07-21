import { TFunction } from '@/@types/next-intl';
import { objectToSelectOptions } from '@/utils/object-to-select-options';
import { z } from 'zod';

export function getActivitiesStepSchema(t: TFunction<'forms'>) {
	return z.object({
		activities_cities_visited: z
			.array(z.string(), {
				required_error: t('errors.field_require_at_least_one'),
			})
			.min(1, {
				message: t('errors.field_require_at_least_one'),
			}),
		activities_attractions_visited: z
			.array(z.string(), {
				required_error: t('errors.field_require_at_least_one'),
			})
			.min(1, {
				message: t('errors.field_require_at_least_one'),
			}),
		activities_used_apps: z.array(z.string()).optional(),
	});
}

export function getActivitiesStepSelectOptions(
	t: TFunction<'forms.IndividualResearchForm.steps.4.fields'>
) {
	return {
		activities_cities_visited: objectToSelectOptions({
			'1': 'Carnaubal',
			'2': 'Croatá',
			'3': 'Guaraciaba do Norte',
			'4': 'Ibiapina',
			'5': 'Ipu',
			'6': 'São Benedito',
			'7': 'Tianguá',
			'8': 'Ubajara',
			'9': 'Viçosa do Ceará',
		}),
		activities_attractions_visited: objectToSelectOptions({
			'1': t('activities_attractions_visited.options.0'),
			'2': t('activities_attractions_visited.options.1'),
			'3': t('activities_attractions_visited.options.2'),
			'4': t('activities_attractions_visited.options.3'),
			'5': t('activities_attractions_visited.options.4'),
			'6': t('activities_attractions_visited.options.5'),
			'7': t('activities_attractions_visited.options.6'),
			'8': t('activities_attractions_visited.options.7'),
			'9': t('activities_attractions_visited.options.8'),
			'10': t('activities_attractions_visited.options.9'),
			'11': t('activities_attractions_visited.options.10'),
		}),
		activities_used_apps: objectToSelectOptions({
			'1': t('activities_used_apps.options.0'),
			'2': t('activities_used_apps.options.1'),
			'3': t('activities_used_apps.options.2'),
			'4': t('activities_used_apps.options.3'),
			'5': t('activities_used_apps.options.4'),
			'6': t('activities_used_apps.options.5'),
			'7': t('activities_used_apps.options.6'),
		}),
	};
}

export type ActivitiesStepType = z.infer<
	ReturnType<typeof getActivitiesStepSchema>
>;
