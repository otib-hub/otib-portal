import { z } from 'zod';

export const activitiesStepSchema = z.object({
	nps_score: z.number().min(1).max(10),
});

export type ActivitiesStepType = z.infer<typeof activitiesStepSchema>;
