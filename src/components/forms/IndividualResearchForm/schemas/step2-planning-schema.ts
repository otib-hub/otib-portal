import { TFunction } from '@/@types/next-intl';
import { objectToSelectOptions } from '@/utils/object-to-select-options';
import { z } from 'zod';

export function getPlanningStepSchema(t: TFunction<'forms'>) {
	return z.object({
		planning_was_planned: z.boolean({
			required_error: t('errors.field_required'),
		}),
		planning_time: z.string().optional(),
		planning_information_sources: z.array(z.string()).optional(),
		planning_organization: z.string({
			required_error: t('errors.field_required'),
		}),
	});
}

export function getPlanningStepSelectOptions(
	t: TFunction<'forms.IndividualResearchForm.steps.2.fields'>
) {
	return {
		planning_time: objectToSelectOptions({
			'1': t('planning_time.options.0'),
			'2': t('planning_time.options.1'),
			'3': t('planning_time.options.2'),
			'4': t('planning_time.options.3'),
		}),
		planning_information_sources: objectToSelectOptions({
			'1': t('planning_information_sources.options.0'),
			'2': t('planning_information_sources.options.1'),
			'3': t('planning_information_sources.options.2'),
			'4': t('planning_information_sources.options.3'),
			'5': t('planning_information_sources.options.4'),
			'6': t('planning_information_sources.options.5'),
		}),
		planning_organization: objectToSelectOptions({
			'1': t('planning_organization.options.0'),
			'2': t('planning_organization.options.1'),
			'3': t('planning_organization.options.2'),
			'4': t('planning_organization.options.3'),
			'5': t('planning_organization.options.4'),
			'6': t('planning_organization.options.5'),
		}),
	};
}

export type PlanningStepType = z.infer<
	ReturnType<typeof getPlanningStepSchema>
>;
