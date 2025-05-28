import { z } from 'zod';
import { getProfileStepSchema } from './step1-profile-schema';
import { getTripStepSchema } from './step3-trip-schema';
import { getActivitiesStepSchema } from './step4-activities-schema';
import { getEvaluationStepSchema } from './step5-evaluation-schema';
import { TFunction } from '@/@types/next-intl';
import { getPlanningStepSchema } from './step2-planning-schema';

export function getExampleFormSchema(t: TFunction<'forms'>) {
	return z.object({
		...getProfileStepSchema(t).shape,
		...getPlanningStepSchema(t).shape,
		...getTripStepSchema(t).shape, // TODO: ajustar todos os schemas para traduzir em tempo de exec
		...getActivitiesStepSchema(t).shape,
		...getEvaluationStepSchema().shape,
	});
}

export type ExampleFormType = z.infer<ReturnType<typeof getExampleFormSchema>>;
