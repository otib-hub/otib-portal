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

const IS_STEP_VALIDATION_ACTIVE = false;

export default function ExampleForm() {
	const {
		currentStep,
		currentStepIndex,
		isLastStep,
		isFirstStep,
		nextStep,
		backStep,
	} = useMultiStepForm(exampleFormSteps);

	const schemas = exampleFormSteps.map(
		(step) => step.schema
	) as z.AnyZodObject[];
	const currentSchema = schemas[currentStepIndex];

	const methods = useForm({
		resolver: zodResolver(currentSchema),
		mode: 'onChange',
		defaultValues: {
			...Object.keys(currentSchema.shape).reduce(
				(acc, key) => ({
					...acc,
					[key]: undefined,
				}),
				{}
			),
		},
	});

	async function onNextStep() {
		if (IS_STEP_VALIDATION_ACTIVE) {
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

	function onSubmit(values: z.infer<typeof currentSchema>) {
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
		</>
	);
}
