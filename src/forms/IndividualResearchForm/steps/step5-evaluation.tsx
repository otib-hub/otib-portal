import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SelectWithSearch } from '@/components/ui/select-with-search';
import { Controller, useFormContext } from 'react-hook-form';
import {
	EvaluationStepType,
	getEvaluationStepSelectOptions,
} from '../schemas/step5-evaluation-schema';
import NpsSlider from '@/components/fragments/NpsSlider';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';

export default function EvaluationStep() {
	const t = useTranslations('forms.IndividualResearchForm.steps.5.fields');
	const evaluationStepSelectOptions = getEvaluationStepSelectOptions(t);
	const {
		control,
		register,
		formState: { errors },
	} = useFormContext<EvaluationStepType>();

	return (
		<>
			<div className='FormFieldsContainer w-full grid gap-8 md:gap-6 grid-cols-1 md:grid-cols-2 items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='evaluation_recommendation_rate'
						aria-invalid={!!errors.evaluation_recommendation_rate}
						aria-required
					>
						{t('evaluation_recommendation_rate.form_label')}
					</FormLabel>

					<Controller
						name='evaluation_recommendation_rate'
						control={control}
						render={({ field }) => (
							<NpsSlider
								id='evaluation_recommendation_rate'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.evaluation_recommendation_rate}
							/>
						)}
					/>
					{errors.evaluation_recommendation_rate && (
						<FormMessage>
							{String(errors.evaluation_recommendation_rate.message)}
						</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='evaluation_dissatisfactions'
						aria-invalid={!!errors.evaluation_dissatisfactions}
					>
						{t('evaluation_dissatisfactions.form_label')}
					</FormLabel>

					<Controller
						name='evaluation_dissatisfactions'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								optional
								multiple
								options={
									evaluationStepSelectOptions.evaluation_dissatisfactions
								}
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.evaluation_dissatisfactions}
							/>
						)}
					/>
					{errors.evaluation_dissatisfactions && (
						<FormMessage>
							{String(errors.evaluation_dissatisfactions.message)}
						</FormMessage>
					)}
				</FormItem>
			</div>

			<Separator className='opacity-70' />

			<div className='FormFieldsContainer w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='evaluation_expectation_rate'
						aria-invalid={!!errors.evaluation_expectation_rate}
						aria-required
					>
						{t('evaluation_expectation_rate.form_label')}
					</FormLabel>

					<Controller
						name='evaluation_expectation_rate'
						control={control}
						render={({ field }) => (
							<NpsSlider
								id='evaluation_expectation_rate'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.evaluation_expectation_rate}
							/>
						)}
					/>
					{errors.evaluation_expectation_rate && (
						<FormMessage>
							{String(errors.evaluation_expectation_rate.message)}
						</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='evaluation_satisfaction_rate'
						aria-invalid={!!errors.evaluation_satisfaction_rate}
						aria-required
					>
						{t('evaluation_satisfaction_rate.form_label')}
					</FormLabel>

					<Controller
						name='evaluation_satisfaction_rate'
						control={control}
						render={({ field }) => (
							<NpsSlider
								id='evaluation_satisfaction_rate'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.evaluation_satisfaction_rate}
							/>
						)}
					/>
					{errors.evaluation_satisfaction_rate && (
						<FormMessage>
							{String(errors.evaluation_satisfaction_rate.message)}
						</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='evaluation_return_intent_rate'
						aria-invalid={!!errors.evaluation_return_intent_rate}
						aria-required
					>
						{t('evaluation_return_intent_rate.form_label')}
					</FormLabel>

					<Controller
						name='evaluation_return_intent_rate'
						control={control}
						render={({ field }) => (
							<NpsSlider
								id='evaluation_return_intent_rate'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.evaluation_return_intent_rate}
							/>
						)}
					/>
					{errors.evaluation_return_intent_rate && (
						<FormMessage>
							{String(errors.evaluation_return_intent_rate.message)}
						</FormMessage>
					)}
				</FormItem>
			</div>

			<Separator className='opacity-70' />

			<div className='FormFieldsContainer w-full grid grid-cols-1 items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='evaluation_open_opinion'
						aria-invalid={!!errors.evaluation_open_opinion}
					>
						{t('evaluation_open_opinion.form_label')}
					</FormLabel>

					<Textarea
						id='evaluation_open_opinion'
						{...register('evaluation_open_opinion')}
						placeholder={t('evaluation_open_opinion.input_placeholder')}
						aria-invalid={!!errors.evaluation_open_opinion}
					/>

					{errors.evaluation_open_opinion && (
						<FormMessage>
							{String(errors.evaluation_open_opinion.message)}
						</FormMessage>
					)}
				</FormItem>
			</div>
		</>
	);
}
