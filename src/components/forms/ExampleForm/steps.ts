import { FormStep } from '@/@types/form-step';
import TouristStep from './steps/step1-profile';
import { Activity, Percent, Plane, User } from 'lucide-react';

export const exampleFormSteps: Array<FormStep> = [
	{
		step: TouristStep,
		number: 1,
		title: 'Você',
		icon: User,
	},
	{
		step: TouristStep,
		number: 2,
		icon: Plane,
		title: 'Viagem',
	},
	{
		step: TouristStep,
		number: 3,
		icon: Activity,
		title: 'Atividades',
	},
	{
		step: TouristStep,
		number: 4,
		icon: Percent,
		title: 'Avaliação',
	},
];
