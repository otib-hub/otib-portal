import { z } from 'zod';
import { profileStepSchema } from './step1-profile-schema';
import { tripStepSchema } from './step2-trip-schema';
import { evaluationStepSchema } from './step4-evaluation-schema';
import { activitiesStepSchema } from './step3-activities-schema';

export const exampleFormSchema = z.object({
	...profileStepSchema.shape,
	...tripStepSchema.shape,
	...activitiesStepSchema.shape,
	...evaluationStepSchema.shape,
});

export type ExampleFormType = z.infer<typeof exampleFormSchema>;
