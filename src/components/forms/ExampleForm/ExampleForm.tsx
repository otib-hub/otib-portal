'use client';

import { Button } from '@/components/ui/button';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import ProfileStep from './steps/step1-profile';
import useMultiStepForm from '@/hooks/use-multistepform';
import FormSteps from '@/components/FormSteps';
import { exampleFormSteps } from './steps';
import { profileStepSchema, ProfileStepType } from './schemas/profile-schema';
import TripStep from './steps/step2-trip';
import ActivitiesStep from './steps/step3-activities';
import EvaluationStep from './steps/step4-evaluation';

export default function ExampleForm() {
	const methods = useForm<ProfileStepType>({
		resolver: zodResolver(profileStepSchema),
		mode: 'onTouched',
	});

	function onSubmit(values: ProfileStepType) {
		toast.success('Form enviado!');
		console.log(values);
	}

	const { currentStepIndex, isLastStep, isFirstStep, nextStep, backStep } =
		useMultiStepForm(exampleFormSteps);

	return (
		<>
			<FormSteps steps={exampleFormSteps} activeStep={currentStepIndex + 1} />
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className='w-full space-y-12 md:space-y-8 mb-16 md:mb-0'
				>
					{currentStepIndex === 0 && <ProfileStep />}
					{currentStepIndex === 1 && <TripStep />}
					{currentStepIndex === 2 && <ActivitiesStep />}
					{currentStepIndex === 3 && <EvaluationStep />}

					<div className='flex gap-4 flex-col md:flex-row md:justify-between'>
						<div
							className={`w-full ${
								isFirstStep ? 'flex' : 'grid grid-cols-2'
							} gap-2 md:w-fit`}
						>
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
								onClick={() => nextStep()}
							>
								{isLastStep ? 'Enviar' : 'Avançar'}
							</Button>
						</div>
						<Button
							className='w-full md:w-fit'
							variant='ghost'
							onClick={() => backStep()}
						>
							Limpar campos
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	);
}
