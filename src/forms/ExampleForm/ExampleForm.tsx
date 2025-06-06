'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import useMultiStepForm from '@/hooks/use-multistepform';
import { getExampleFormSteps } from './steps';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import FormStepper from '@/components/FormStepper';
import FormDebugDialog from '@/components/FormDebugDialog';
import { useTranslations } from 'next-intl';
import { getExampleFormSchema } from './schemas/form-general-schema';
import { postPesquisaCompleta } from '@/services/api';

const STEP_BLOCK_VALIDATION = false;
const DEV_MODE = true;

export default function ExampleForm() {
	const t = useTranslations('forms');
	const exampleFormSteps = getExampleFormSteps(t);
	const exampleFormSchema = getExampleFormSchema(t);

	const {
		currentStep,
		currentStepIndex,
		isLastStep,
		isFirstStep,
		nextStep,
		backStep,
	} = useMultiStepForm(exampleFormSteps);

	const methods = useForm({
		resolver: zodResolver(exampleFormSchema),
		mode: 'onTouched',
		context: { t },
		defaultValues: {
			...Object.keys(exampleFormSchema.shape).reduce(
				(acc, key) => ({
					...acc,
					[key]: undefined,
				}),
				{}
			),
		},
	});

	const [submitting, setSubmitting ] = useState(false);

	async function onNextStep() {
		if (STEP_BLOCK_VALIDATION) {
			const isValid = await methods.trigger();
			if (!isValid) {
				toast.error(t('common.toast_content_invalid'));
				return;
			}
		}

		if (!isLastStep) {
			nextStep();
		} else {
			const values = methods.getValues() as z.infer<typeof exampleFormSchema>;
			onSubmit(methods.getValues());
		}
	}




	async function onSubmit(values: z.infer<typeof exampleFormSchema>) {
		try{
			setSubmitting(true);

			
			const responseJson = await postPesquisaCompleta(values);

			toast.success(t('common.toast_submit_success'), {id: 'form-submit' });
		
			console.log('resposta do backend: ', responseJson);
		}catch(err: any){
			console.error('Erro ao submeter form:', err);
			toast.error(
				t('common.toast_content_invalid') + (err.message ? `: ${err.message}` : ''),
				{ id: 'form-submit' }
			);

		}finally{
			setSubmitting(false);
		}

	}

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentStepIndex]);

	return (
		<>
			<FormStepper steps={exampleFormSteps} activeStep={currentStepIndex + 1} />
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

						<Button
							className='w-full md:w-fit'
							type={isLastStep ? 'submit' : 'button'}
							onClick={onNextStep}
						>
							{isLastStep ? t('common.button_submit') : t('common.button_next')}
						</Button>
					</div>
				</form>
			</FormProvider>

			{DEV_MODE && <FormDebugDialog data={methods.watch()} />}
		</>
	);
}
