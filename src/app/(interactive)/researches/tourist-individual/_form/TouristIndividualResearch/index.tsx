'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import useMultiStepForm from '@/hooks/layout/use-multistep-form';
import { getTouristIndividualResearchFormSteps } from './steps';
import FormStepper from '@/components/forms/FormStepper';
import FormDebugDialog from '@/components/forms/FormDebugDialog';
import { useTranslations } from 'next-intl';
import {
	getTouristIndividualResearchFormSchema,
	TouristIndividualResearchFormType,
} from './schemas/form-schema';
import { handleSubmitTouristIndividualResearch } from '@/actions/post/handle-submit-tourist-individual-research';
import { TutorialDialog } from './fragments/TutorialDialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { TOURIST_INDIVIDUAL_RESPONSE_MOCK } from './response-mock';

const BLOCK_STEP_IF_INVALID = true;
const DEV_MODE = process.env.NEXT_PUBLIC_CURRENT_ENV === 'development';

export function TouristIndividualResearchForm() {
	const router = useRouter();
	const t = useTranslations('forms');
	const steps = getTouristIndividualResearchFormSteps(t);
	const schema = getTouristIndividualResearchFormSchema(t);

	const methods = useForm<TouristIndividualResearchFormType>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		context: { t },
		defaultValues: DEV_MODE
			? TOURIST_INDIVIDUAL_RESPONSE_MOCK
			: {
					...Object.keys(schema.shape).reduce(
						(acc, key) => ({
							...acc,
							[key]: undefined,
						}),
						{},
					),
			  },
	});

	const {
		currentStep,
		currentStepIndex,
		isLastStep,
		isFirstStep,
		navigateToStep,
		validateAndNextStep,
		previousStep,
	} = useMultiStepForm({
		steps,
		methods,
		blockStepIfInvalid: BLOCK_STEP_IF_INVALID,
	});

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [isWaitingRedirect, setIsWaitingRedirect] = useState(false);

	async function onNextStep(e: React.MouseEvent) {
		e.preventDefault();
		validateAndNextStep();
	}

	async function handleFormSubmit(
		formData: TouristIndividualResearchFormType,
	) {
		setIsSubmitting(true);

		try {
			const res = await handleSubmitTouristIndividualResearch(formData);
			if (!res.success) throw new Error(res.message);

			let countdown = 3;
			setIsWaitingRedirect(true);

			toast.success(
				t('common.toast_submit_success') + ` (${countdown}s)`,
				{
					id: 'form-submit',
				},
			);

			const interval = setInterval(() => {
				countdown--;

				if (countdown > 0) {
					toast.success(
						<div className="flex gap-2 items-center">
							{t('common.toast_submit_success') +
								` (${countdown}s)`}
							<Spinner size="small" color="text-primary" />
						</div>,
						{ id: 'form-submit' },
					);
				} else {
					clearInterval(interval);
					toast.dismiss('form-submit');
					router.push('/researches/thanks');
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
					fieldsWithErrors.includes(field),
				);

				return hasError ? steps[index] : null;
			})
			.filter(Boolean);

		// exibe uma mensagem de erro personalizada com os passos em que erros foram encontrados
		if (invalidStepLabels.length > 0) {
			toast.error(
				<div className="w-full">
					<p className="mb-2 font-bold text-base">{`${t(
						'errors.fields_invalid_in_respective_steps',
					)}:`}</p>

					<div className="grid grid-cols-2 items-start justify-start">
						{invalidStepLabels.map((step, idx) => {
							return (
								step && (
									<Button
										title={`${step.number}. ${step.title}`}
										className="text-destructive text-start text-base place-self-start"
										variant={'link'}
										key={idx}
										onClick={() =>
											navigateToStep(step.number)
										}
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
				},
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
					onSubmit={methods.handleSubmit(
						handleFormSubmit,
						onInvalidFormSubmit,
					)}
					className="w-full space-y-12 md:space-y-8"
				>
					{currentStep}

					<div className="flex gap-4 flex-col-reverse md:flex-row md:justify-start">
						{!isFirstStep && (
							<Button
								title={t('common.button_back')}
								className="w-full md:w-fit"
								variant="outline"
								type="button"
								onClick={previousStep}
								disabled={isSubmitting || isWaitingRedirect}
							>
								{t('common.button_back')}
							</Button>
						)}

						{isLastStep ? (
							<Button
								title={
									isSubmitting || isWaitingRedirect
										? t('common.toast_submitting')
										: t('common.button_submit')
								}
								className="w-full md:w-fit"
								type="submit"
								disabled={isSubmitting || isWaitingRedirect}
							>
								{isSubmitting || isWaitingRedirect ? (
									<Spinner
										size="small"
										color="text-background"
										className="flex gap-2 items-center animate-pulse"
									>
										{t('common.toast_submitting')}
									</Spinner>
								) : (
									t('common.button_submit')
								)}
							</Button>
						) : (
							<Button
								title={t('common.button_next')}
								className="w-full md:w-fit"
								type="button"
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
