import { FormStep } from '@/@types/form-step';
import TouristStep from './steps/step1-profile';
import { Activity, Percent, Plane, Route, User } from 'lucide-react';
import { getProfileStepSchema } from './schemas/step1-profile-schema';
import { getTripStepSchema } from './schemas/step3-trip-schema';
import ActivitiesStep from './steps/step4-activities';
import EvaluationStep from './steps/step5-evaluation';
import { getActivitiesStepSchema } from './schemas/step4-activities-schema';
import { getEvaluationStepSchema } from './schemas/step5-evaluation-schema';
import TripStep from './steps/step3-trip';
import PlanningStep from './steps/step2-planning';
import { TFunction } from '@/@types/next-intl';
import { getPlanningStepSchema } from './schemas/step2-planning-schema';

export function getIndividualResearchFormSteps(
	t: TFunction<'forms'>
): Array<FormStep> {
	return [
		{
			number: 1,
			title: t('IndividualResearchForm.steps.1.title'),
			step: TouristStep,
			schema: getProfileStepSchema(t),
			icon: User,
		},
		{
			number: 2,
			title: t('IndividualResearchForm.steps.2.title'),
			step: PlanningStep,
			schema: getPlanningStepSchema(t),
			icon: Route,
		},
		{
			number: 3,
			title: t('IndividualResearchForm.steps.3.title'),
			step: TripStep,
			schema: getTripStepSchema(t),
			icon: Plane,
		},
		{
			number: 4,
			title: t('IndividualResearchForm.steps.4.title'),
			step: ActivitiesStep,
			schema: getActivitiesStepSchema(t),
			icon: Activity,
		},
		{
			number: 5,
			title: t('IndividualResearchForm.steps.5.title'),
			step: EvaluationStep,
			schema: getEvaluationStepSchema(),
			icon: Percent,
		},
	];
}
