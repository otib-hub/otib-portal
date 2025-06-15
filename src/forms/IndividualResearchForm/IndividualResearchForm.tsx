'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import useMultiStepForm from '@/hooks/use-multistep-form';
import { getIndividualResearchFormSteps } from './steps';
import FormStepper from '@/components/FormStepper';
import FormDebugDialog from '@/components/FormDebugDialog';
import { useTranslations } from 'next-intl';
import {
	getIndividualResearchFormSchema,
	IndividualResearchFormType,
} from './schemas/individual-research-form-schema';
import { handleSubmitIndividualResearch } from '@/services/handle-submit-individual-research';
import { TutorialDialog } from './components/TutorialDialog/TutorialDialog';
import { useRouter } from 'next/navigation';

const BLOCK_STEP_IF_INVALID = true;
const DEV_MODE = process.env.NEXT_PUBLIC_ENV === 'development';

export default function IndividualResearchForm() {
	const router = useRouter();
	const t = useTranslations('forms');
	const steps = getIndividualResearchFormSteps(t);
	const schema = getIndividualResearchFormSchema(t);

	const methods = useForm<IndividualResearchFormType>({
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

	async function onNextStep(e: React.MouseEvent) {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: 'smooth' });
		nextStep();
	}

	async function handleFormSubmit(formData: IndividualResearchFormType) {
		try {
			await handleSubmitIndividualResearch(formData);
			toast.success(t('common.toast_submit_success'), { id: 'form-submit' });
			setTimeout(() => {
				router.push('/form/thanks');
			}, 2000);
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

			<TutorialDialog />

			{DEV_MODE && <FormDebugDialog data={methods.watch()} />}
		</>
	);
}
