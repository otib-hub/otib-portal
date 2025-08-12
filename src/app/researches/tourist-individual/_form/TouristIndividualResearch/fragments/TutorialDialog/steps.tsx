import { ModalStep } from '@/@types/modal-step';
import { StepOne } from './steps/StepOne';
import { TFunction } from '@/@types/next-intl';

export function getTutorialDialogSteps(
	t: TFunction<'forms'>
): Array<ModalStep> {
	return [
		{
			number: 1,
			title: t('TouristIndividualResearchForm.TutorialDialog.steps.1.title'),
			step: <StepOne />,
		},
	];
}
