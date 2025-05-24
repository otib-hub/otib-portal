import { z } from 'zod';
import { profileStepSchema } from './step1-profile-schema';
import { tripStepSchema } from './step3-trip-schema';
import { evaluationStepSchema } from './step5-evaluation-schema';
import { activitiesStepSchema } from './step4-activities-schema';
import { planningStepSchema } from './step2-planning-schema';

export const exampleFormSchema = z.object({
	...profileStepSchema.shape,
	...planningStepSchema.shape,
	...tripStepSchema.shape,
	...activitiesStepSchema.shape,
	...evaluationStepSchema.shape,
});

export type ExampleFormType = z.infer<typeof exampleFormSchema>;
