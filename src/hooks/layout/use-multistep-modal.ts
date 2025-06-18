import { ModalStep } from '@/@types/modal-step';
import { useState } from 'react';

interface UseMultiStepModalProps {
	steps: ModalStep[];
}

export default function useMultiStepModal({ steps }: UseMultiStepModalProps) {
	const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

	const nextStep = async () => {
		setCurrentStepIndex((i) => (i < steps.length - 1 ? i + 1 : i));
	};

	const backStep = () => {
		setCurrentStepIndex((i) => (i > 0 ? i - 1 : i));
	};

	const navigateToStep = (stepIndex: number) => {
		setCurrentStepIndex(stepIndex - 1);
	};

	return {
		currentStep: steps[currentStepIndex].step,
		currentStepIndex,

		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,

		nextStep,
		backStep,
		navigateToStep,
	};
}
