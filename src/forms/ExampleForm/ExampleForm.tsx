'use client';

import { Button } from '@/components/ui/button';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import useMultiStepForm from '@/hooks/use-multistepform';
import { exampleFormSteps } from './steps';
import { z } from 'zod';
import { useEffect } from 'react';
import FormStepper from '@/components/FormStepper';
import { exampleFormSchema } from './schemas/form-general-schema';
import FormDebugDialog from '@/components/FormDebugDialog';

const STEP_BLOCK_VALIDATION = false;
const DEV_MODE = true;

export default function ExampleForm() {
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
		mode: 'onChange',
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

	async function onNextStep() {
		if (STEP_BLOCK_VALIDATION) {
			const isValid = await methods.trigger();
			if (!isValid) {
				toast.error('Por favor, preencha todos os campos obrigatórios');
				return;
			}
		}

		if (!isLastStep) {
			nextStep();
		} else {
			onSubmit(methods.getValues());
		}
	}

	function onSubmit(values: z.infer<typeof exampleFormSchema>) {
		toast.success('Form enviado!');
		console.log(values);
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
								Voltar
							</Button>
						)}

						<Button
							className='w-full md:w-fit'
							type={isLastStep ? 'submit' : 'button'}
							onClick={onNextStep}
						>
							{isLastStep ? 'Enviar' : 'Avançar'}
						</Button>
					</div>
				</form>
			</FormProvider>

			{DEV_MODE && <FormDebugDialog data={methods.getValues()} />}
		</>
	);
}
