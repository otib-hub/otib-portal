import { FormStep } from '@/@types/form-step';
import TouristStep from './steps/step1-profile';
import { Activity, Percent, Plane, Route, User } from 'lucide-react';
import { profileStepSchema } from './schemas/step1-profile-schema';
import { tripStepSchema } from './schemas/step3-trip-schema';
import ActivitiesStep from './steps/step4-activities';
import EvaluationStep from './steps/step5-evaluation';
import { activitiesStepSchema } from './schemas/step4-activities-schema';
import { evaluationStepSchema } from './schemas/step5-evaluation-schema';
import TripStep from './steps/step3-trip';
import PlanningStep from './steps/step2-planning';

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
		title: 'Planos',
		step: PlanningStep,
		schema: profileStepSchema,
		icon: Route,
	},
	{
		number: 3,
		title: 'Viagem',
		step: TripStep,
		schema: tripStepSchema,
		icon: Plane,
	},
	{
		number: 4,
		title: 'Atividades',
		step: ActivitiesStep,
		schema: activitiesStepSchema,
		icon: Activity,
	},
	{
		number: 5,
		title: 'Avaliação',
		step: EvaluationStep,
		schema: evaluationStepSchema,
		icon: Percent,
	},
];
