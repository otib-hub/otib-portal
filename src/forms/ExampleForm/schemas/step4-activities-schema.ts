import { TFunction } from '@/@types/next-intl';
import { objectToSelectOptions } from '@/utils/object-to-select-options';
import { z } from 'zod';

export function getActivitiesStepSchema(t: TFunction<'forms'>) {
	return z.object({
		activities_places_visited: z
			.array(z.string(), {
				required_error: t('errors.field_require_custom', { count: 3 }),
			})
			.min(3, { message: t('errors.field_require_custom', { count: 3 }) }),
		activities_events_visited: z.array(z.string()).optional(),
		activities_used_apps: z.array(z.string()).optional(),
	});
}

export function getActivitiesStepSelectOptions(
	t: TFunction<'forms.ExampleForm.steps.4.fields'>
) {
	return {
		activities_places_visited: objectToSelectOptions({
			'0': 'Carnaubal',
			'1': 'Croatá',
			'2': 'Guaraciaba do Norte',
			'3': 'Ibiapina',
			'4': 'Ipu',
			'5': 'São Benedito',
			'6': 'Tianguá',
			'7': 'Ubajara',
			'8': 'Viçosa do Ceará',
		}),
		activities_events_visited: objectToSelectOptions({
			'0': t('activities_events_visited.options.0'),
			'1': t('activities_events_visited.options.1'),
			'2': t('activities_events_visited.options.2'),
			'3': t('activities_events_visited.options.3'),
		}),
		activities_used_apps: objectToSelectOptions({
			'0': t('activities_used_apps.options.0'),
			'1': t('activities_used_apps.options.1'),
			'2': t('activities_used_apps.options.2'),
			'3': t('activities_used_apps.options.3'),
			'4': t('activities_used_apps.options.4'),
			'5': t('activities_used_apps.options.5'),
			'6': t('activities_used_apps.options.6'),
		}),
	};
}

export type ActivitiesStepType = z.infer<
	ReturnType<typeof getActivitiesStepSchema>
>;
