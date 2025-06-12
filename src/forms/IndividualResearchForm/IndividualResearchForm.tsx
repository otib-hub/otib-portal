'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import useMultiStepForm from '@/hooks/use-multistep-form';
import { getIndividualResearchFormSteps } from './steps';
import { useEffect } from 'react';
import FormStepper from '@/components/FormStepper';
import FormDebugDialog from '@/components/FormDebugDialog';
import { useTranslations } from 'next-intl';
import {
	getIndividualResearchFormSchema,
	IndividualResearchFormType,
} from './schemas/individual-research-form-schema';
import { handleSubmitIndividualResearch } from '@/services/handle-submit-individual-research';

const STEP_BLOCK_VALIDATION = false;
const DEV_MODE = process.env.NEXT_PUBLIC_ENV === 'development';

export default function IndividualResearchForm() {
	const t = useTranslations('forms');
	const steps = getIndividualResearchFormSteps(t);
	const schema = getIndividualResearchFormSchema(t);

	const {
		currentStep,
		currentStepIndex,
		isLastStep,
		isFirstStep,
		nextStep,
		backStep,
	} = useMultiStepForm(steps);

	const methods = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
		context: { t },
		defaultValues: {
			...Object.keys(schema.shape).reduce(
				(acc, key) => ({
					...acc,
					[key]: undefined,
				}),
				{}
			),
		},
	});

	async function onNextStep(e: React.MouseEvent) {
		e.preventDefault();

		if (STEP_BLOCK_VALIDATION) {
			const isValid = await methods.trigger();
			if (!isValid) {
				toast.error(t('common.toast_content_invalid'));
				return;
			}
		}

		nextStep();
	}

	async function handleFormSubmit(formData: IndividualResearchFormType) {
		try {
			const response = await handleSubmitIndividualResearch(formData);
			toast.success(t('common.toast_submit_success'), { id: 'form-submit' });
			console.log('resposta do backend: ', response);
		} catch (err) {
			const errorText =
				typeof err === 'object' && err !== null && 'message' in err
					? `${err.message}`
					: '';

			console.error('Internal error: ' + errorText);
			toast.error('Internal error: ' + errorText, { id: 'form-submit' });
		}
	}

	async function onInvalidFormSubmit() {
		await methods.trigger();

		const errors = methods.formState.errors;
		const fieldsWithErrors = Object.keys(errors);

		const invalidStepLabels = steps
			.map((step, index) => {
				const stepFields = Object.keys(step.schema.shape);
				const hasError = stepFields.some((field) =>
					fieldsWithErrors.includes(field)
				);

				return hasError
					? `${`${steps[index].number}. ${steps[index].title}`}`
					: null;
			})
			.filter(Boolean);

		// exibe uma mensagem de erro personalizada com os passos em que erros foram encontrados
		if (invalidStepLabels.length > 0) {
			toast.error(
				<p className='w-full'>
					{`${t(
						'errors.fields_invalid_in_respective_steps'
					)}:\n${invalidStepLabels.join('\n')}`}
				</p>,
				{
					className: 'max-w-screen whitespace-pre-wrap',
					id: 'form-invalid-steps',
				}
			);
		} else {
			toast.error(t('common.toast_content_invalid'), {
				id: 'form-generic-invalid',
			});
		}
	}

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentStepIndex]);

	return (
		<>
			<FormStepper steps={steps} activeStep={currentStepIndex + 1} />
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(handleFormSubmit, onInvalidFormSubmit)}
					className='w-full space-y-12 md:space-y-8 mb-16 md:mb-0'
				>
					{currentStep}

					<div className='flex gap-4 flex-col-reverse md:flex-row md:justify-start'>
						{!isFirstStep && (
							<Button
								className='w-full md:w-fit'
								variant='outline'
								type='button'
								onClick={backStep}
							>
								{t('common.button_back')}
							</Button>
						)}

						{isLastStep ? (
							<Button className='w-full md:w-fit' type='submit'>
								{t('common.button_submit')}
							</Button>
						) : (
							<Button
								className='w-full md:w-fit'
								type='button'
								onClick={onNextStep}
							>
								{t('common.button_next')}
							</Button>
						)}
					</div>
				</form>
			</FormProvider>

			{DEV_MODE && <FormDebugDialog data={methods.watch()} />}
		</>
	);
}
