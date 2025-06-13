import { FormStep } from '@/@types/form-step';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { createElement, useState } from 'react';
import { toast } from 'sonner';

interface UseMultiStepFormProps<T extends FieldValues> {
	steps: FormStep[];
	methods: UseFormReturn<T>;
	blockStepIfInvalid?: boolean;
}

export default function useMultiStepForm<T extends FieldValues>({
	steps,
	methods,
	blockStepIfInvalid = false,
}: UseMultiStepFormProps<T>) {
	const t = useTranslations('forms');
	const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

	const currentStepSchema = steps[currentStepIndex].schema;
	const currentStepFields = Object.keys(currentStepSchema.shape);

	const nextStep = async () => {
		if (blockStepIfInvalid) {
			const isValid = await methods.trigger(currentStepFields as Path<T>[]);
			if (!isValid) {
				toast.error(t('common.toast_content_invalid'));
				return;
			}
		}

		setCurrentStepIndex((i) => (i < steps.length - 1 ? i + 1 : i));
	};

	const backStep = () => {
		setCurrentStepIndex((i) => (i > 0 ? i - 1 : i));
	};

	const navigateToStep = (stepIndex: number) => {
		setCurrentStepIndex(stepIndex - 1);
	};

	return {
		currentStep: createElement(steps[currentStepIndex].step),
		currentStepIndex,

		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,

		nextStep,
		backStep,
		navigateToStep,
	};
}
