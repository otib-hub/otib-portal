import { FormStep } from '@/@types/form-step';
import TouristStep from './steps/step1-profile';
import { Activity, Percent, Plane, User } from 'lucide-react';
import { profileStepSchema } from './schemas/step1-profile-schema';
import { tripStepSchema } from './schemas/step2-trip-schema';
import ActivitiesStep from './steps/step3-activities';
import EvaluationStep from './steps/step4-evaluation';
import { activitiesStepSchema } from './schemas/step3-activities-schema';
import { evaluationStepSchema } from './schemas/step4-evaluation-schema';
import TripStep from './steps/step2-trip';

export const exampleFormSteps: Array<FormStep> = [
	{
		number: 1,
		title: 'Você',
		step: TouristStep,
		schema: profileStepSchema,
		icon: User,
	},
	{
		number: 2,
		title: 'Viagem',
		step: TripStep,
		schema: tripStepSchema,
		icon: Plane,
	},
	{
		number: 3,
		title: 'Atividades',
		step: ActivitiesStep,
		schema: activitiesStepSchema,
		icon: Activity,
	},
	{
		number: 4,
		title: 'Avaliação',
		step: EvaluationStep,
		schema: evaluationStepSchema,
		icon: Percent,
	},
];
