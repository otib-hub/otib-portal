import { z } from 'zod';
import { getProfileStepSchema } from './step1-profile-schema';
import { getTripStepSchema } from './step3-trip-schema';
import { getActivitiesStepSchema } from './step4-activities-schema';
import { getEvaluationStepSchema } from './step5-evaluation-schema';
import { TFunction } from '@/@types/next-intl';
import { getPlanningStepSchema } from './step2-planning-schema';

export function getIndividualResearchFormSchema(t: TFunction<'forms'>) {
	return z.object({
		...getProfileStepSchema(t).shape,
		...getPlanningStepSchema(t).shape,
		...getTripStepSchema(t).shape,
		...getActivitiesStepSchema(t).shape,
		...getEvaluationStepSchema().shape,
	});
}

export type IndividualResearchFormType = z.infer<
	ReturnType<typeof getIndividualResearchFormSchema>
>;
