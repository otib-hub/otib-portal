'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import useMultiStepForm from '@/hooks/use-multistep-form';
import { getIndividualResearchFormSteps } from './steps';
import FormStepper from '@/components/fragments/FormStepper';
import FormDebugDialog from '@/components/layout/FormDebugDialog';
import { useTranslations } from 'next-intl';
import {
	getIndividualResearchFormSchema,
	IndividualResearchFormType,
} from './schemas/individual-research-form-schema';
import { handleSubmitIndividualResearch } from '@/services/handle-submit-individual-research';
import { TutorialDialog } from './components/TutorialDialog/TutorialDialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';

const BLOCK_STEP_IF_INVALID = true;
const DEV_MODE = process.env.NEXT_PUBLIC_ENV === 'development';

// Mock do formulário para ambiente de desenvolvimento
const MOCK_FORM_DATA: Partial<IndividualResearchFormType> = {
	// Profile Step
	tourist_age_group: '2', // 25-34 years
	tourist_gender: 'male',
	tourist_education: '5', // Graduação
	tourist_estimated_income: 'mid',

	// Planning Step
	planning_was_planned: true,
	planning_time: '2', // 1-3 meses
	planning_information_sources: ['1', '3', '4'], // Internet, Amigos, Redes Sociais
	planning_organization: '1', // Sozinho

	// Trip Step
	trip_has_reincidence: true,
	trip_reincidence: '2', // 2-3 vezes
	trip_know_ibiapaba_mirantes: true,
	trip_how_know_ibiapaba_mirantes: ['1', '2'], // Internet, Amigos
	trip_reasons: ['1', '3'], // Turismo, Natureza
	trip_vehicles: ['1'], // Carro próprio
	trip_stay_time: '2', // 2-3 dias
	trip_average_diary_expense: '2', // R$ 100-200
	trip_hosting_types: ['1', '2'], // Hotel, Pousada

	// Activities Step
	activities_cities_visited: ['1', '2'], // São Benedito, Ubajara
	activities_attractions_visited: ['1', '2', '3'], // Mirantes, Cachoeiras, Trilhas
	activities_used_apps: ['1', '2'], // Google Maps, Instagram

	// Evaluation Step
	evaluation_recommendation_rate: 9,
	evaluation_dissatisfactions: ['1', '2'],
	evaluation_expectation_rate: 8,
	evaluation_satisfaction_rate: 9,
	evaluation_return_intent_rate: 10,
	evaluation_open_opinion:
		'Excelente experiência! Recomendo fortemente a visita.',
};

export default function IndividualResearchForm() {
	const router = useRouter();
	const t = useTranslations('forms');
	const steps = getIndividualResearchFormSteps(t);
	const schema = getIndividualResearchFormSchema(t);

	const methods = useForm<IndividualResearchFormType>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		context: { t },
		defaultValues: DEV_MODE
			? MOCK_FORM_DATA
			: {
					...Object.keys(schema.shape).reduce(
						(acc, key) => ({
							...acc,
							[key]: undefined,
						}),
						{}
					),
			  },
	});

	const {
		currentStep,
		currentStepIndex,
		isLastStep,
		isFirstStep,
		navigateToStep,
		nextStep,
		backStep,
	} = useMultiStepForm<IndividualResearchFormType>({
		steps,
		methods,
		blockStepIfInvalid: BLOCK_STEP_IF_INVALID,
	});

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	async function onNextStep(e: React.MouseEvent) {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: 'smooth' });
		nextStep();
	}

	async function handleFormSubmit(formData: IndividualResearchFormType) {
		setIsSubmitting(true);

		try {
			const res = await handleSubmitIndividualResearch(formData);
			if (!res.success) throw new Error(res.message);

			let countdown = 3;

			toast.success(t('common.toast_submit_success') + ` (${countdown}s)`, {
				id: 'form-submit',
			});

			const interval = setInterval(() => {
				countdown--;

				if (countdown > 0) {
					toast.success(
						<div className='flex gap-2 items-center'>
							{t('common.toast_submit_success') + ` (${countdown}s)`}
							<Spinner size='small' color='text-primary' />
						</div>,
						{ id: 'form-submit' }
					);
				} else {
					clearInterval(interval);
					toast.dismiss('form-submit');
					router.push('/form/thanks');
				}
			}, 1000);
		} catch (err) {
			const errorText =
				typeof err === 'object' && err !== null && 'message' in err
					? `${err.message}`
					: '';
			console.error('Internal error: ' + errorText);
			toast.error('Internal error: ' + errorText, { id: 'form-submit' });
		} finally {
			setIsSubmitting(false);
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

				return hasError ? steps[index] : null;
			})
			.filter(Boolean);

		// exibe uma mensagem de erro personalizada com os passos em que erros foram encontrados
		if (invalidStepLabels.length > 0) {
			toast.error(
				<div className='w-full'>
					<p className='mb-2 font-bold text-base'>{`${t(
						'errors.fields_invalid_in_respective_steps'
					)}:`}</p>

					<div className='grid grid-cols-2 items-start justify-start'>
						{invalidStepLabels.map((step, idx) => {
							return (
								step && (
									<Button
										className='text-destructive text-start text-base place-self-start'
										variant={'link'}
										key={idx}
										onClick={() => navigateToStep(step.number)}
									>
										{`${step.number}. ${step.title}`}
									</Button>
								)
							);
						})}
					</div>
				</div>,
				{
					className: 'max-w-screen max-h-fit whitespace-pre-wrap',
					id: 'form-invalid-steps',
				}
			);
		} else {
			toast.error(t('common.toast_content_invalid'), {
				id: 'form-generic-invalid',
			});
		}
	}

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
								disabled={isSubmitting}
							>
								{t('common.button_back')}
							</Button>
						)}

						{isLastStep ? (
							<Button
								className='w-full md:w-fit'
								type='submit'
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<Spinner
										size='small'
										color='text-background'
										className='flex gap-2 items-center animate-pulse'
									>
										{t('common.toast_submitting')}
									</Spinner>
								) : (
									t('common.button_submit')
								)}
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

			<TutorialDialog />

			{DEV_MODE && <FormDebugDialog data={methods.watch()} />}
		</>
	);
}
