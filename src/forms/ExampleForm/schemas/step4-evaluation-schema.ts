import { z } from 'zod';

export const evaluationStepSchema = z.object({
	test: z.string(),
});
