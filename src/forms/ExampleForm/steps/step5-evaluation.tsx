import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SelectWithSearch } from '@/components/ui/select-with-search';
import { Controller, useFormContext } from 'react-hook-form';
import {
	evaluationStepSelectOptions,
	EvaluationStepType,
} from '../schemas/step5-evaluation-schema';
import NpsSlider from '@/components/NpsSlider';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

export default function EvaluationStep() {
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
						htmlFor='evaluation_expectation_rate'
						aria-invalid={!!errors.evaluation_expectation_rate}
						aria-required
					>
						De 1 a 10, o quanto você recomendaria alguém visitar a Ibiapaba?
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
						Quais aspectos menos gostou na visita?
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
						Qual era seu nível de expectativa antes da visita?
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
						Qual foi o seu nível de satisfação após a visita?
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
						O quanto você pretende retornar à Ibiapaba?
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
						Você necessitou de algum serviço que não foi encontrado na Ibiapaba
						ou tem alguma recomendação de melhoria da infraestrutura,
						equipamentos e serviços turísticos?
					</FormLabel>

					<Textarea
						id='evaluation_open_opinion'
						{...register('evaluation_open_opinion')}
						placeholder='Gostaríamos de ouvir sua opinião :)'
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
