import { FormStep } from '@/@types/form-step';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { createElement, useState } from 'react';
import { toast } from 'sonner';
import { scrollToInvalidField } from '@/utils/scroll-to-invalid-field';

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

	async function validateAndNextStep() {
		if (blockStepIfInvalid) {
			const isValid = await methods.trigger(currentStepFields as Path<T>[]);

			if (!isValid) {
				if (typeof window !== 'undefined' && window.innerWidth <= 768) {
					const errors = methods.formState.errors as Record<string, unknown>;
					const firstInvalidField = currentStepFields.find(
						(field) => !!errors[field]
					);

					setTimeout(() => {
						scrollToInvalidField(firstInvalidField);
					}, 100); // aguarda para garantir que os erros foram atualizados no DOM
				}

				toast.error(t('common.toast_content_invalid'));
				return;
			}
		}

		setCurrentStepIndex((i) => (i < steps.length - 1 ? i + 1 : i));
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function previousStep() {
		setCurrentStepIndex((i) => (i > 0 ? i - 1 : i));
	}

	function navigateToStep(stepIndex: number) {
		setCurrentStepIndex(stepIndex - 1);
	}

	return {
		currentStep: createElement(steps[currentStepIndex].step),
		currentStepIndex,

		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,

		validateAndNextStep,
		previousStep,
		navigateToStep,
	};
}
