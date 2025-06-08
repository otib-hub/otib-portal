'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import useMultiStepForm from '@/hooks/use-multistepform';
import { getIndividualResearchFormSteps } from './steps';
import { useEffect } from 'react';
import FormStepper from '@/components/FormStepper';
import FormDebugDialog from '@/components/FormDebugDialog';
import { useTranslations } from 'next-intl';
import { getIndividualResearchFormSchema } from './schemas/form-general-schema';
import { handleSubmitIndividualResearch } from '@/services/handle-submit-individual-research';

const STEP_BLOCK_VALIDATION = false;
const DEV_MODE = true;

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

	async function onNextStep() {
		if (STEP_BLOCK_VALIDATION) {
			const isValid = await methods.trigger();
			if (!isValid) {
				toast.error(t('common.toast_content_invalid'));
				return;
			}
		}

		nextStep();
	}

	async function onSubmit() {
		try {
			const isDataValid = await methods.trigger();
			if (!isDataValid) {
				toast.error(t('common.toast_content_invalid'));
				return;
			}

			const values = methods.getValues();
			const response = await handleSubmitIndividualResearch(values);

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

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentStepIndex]);

	return (
		<>
			<FormStepper steps={steps} activeStep={currentStepIndex + 1} />
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className='w-full space-y-12 md:space-y-8 mb-16 md:mb-0'
				>
					{currentStep}

					<div className='flex gap-4 flex-col-reverse md:flex-row md:justify-start'>
						{!isFirstStep && (
							<Button
								className='w-full md:w-fit'
								variant='outline'
								type='button'
								onClick={() => backStep()}
							>
								{t('common.button_back')}
							</Button>
						)}

						{isLastStep ? (
							<Button
								className='w-full md:w-fit'
								type='submit'
								onClick={onSubmit}
							>
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
