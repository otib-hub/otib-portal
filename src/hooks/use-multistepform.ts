import { FormStep } from '@/@types/form-step';
import { useState } from 'react';
import { toast } from 'sonner';

export default function useMultiStepForm(
	steps: FormStep[],
	onStepValidation?: (currentStepIndex: number) => Promise<boolean>,
	validateStepsBeforePass = false
) {
	const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

	const nextStep = async () => {
		if (validateStepsBeforePass && onStepValidation) {
			const isValid = await onStepValidation(currentStepIndex);

			if (!isValid) {
				toast.error(
					'Por favor, preencha todos os campos obrigatórios corretamente'
				);
				return;
			}
		}
		setCurrentStepIndex((i) => (i < steps.length - 1 ? i + 1 : i));
	};

	const backStep = () => {
		setCurrentStepIndex((i) => (i > 0 ? i - 1 : i));
	};

	return {
		currentStepIndex,
		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,
		nextStep,
		backStep,
	};
}
