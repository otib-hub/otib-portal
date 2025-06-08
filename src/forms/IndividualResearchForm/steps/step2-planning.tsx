import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Controller, useFormContext } from 'react-hook-form';
import { SelectWithSearch } from '@/components/ui/select-with-search';
import { Separator } from '@/components/ui/separator';
import {
	PlanningStepType,
	getPlanningStepSelectOptions,
} from '../schemas/step2-planning-schema';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTranslations } from 'next-intl';

export default function PlanningStep() {
	const t = useTranslations('forms.IndividualResearchForm.steps.2.fields');
	const planningStepSelectOptions = getPlanningStepSelectOptions(t);
	const {
		control,
		watch,
		formState: { errors },
	} = useFormContext<PlanningStepType>();

	return (
		<>
			<div className='FormFieldsContainer w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start gap-8'>
				<div className='RadioGroupContainer flex flex-col'>
					<Controller
						name='planning_was_planned'
						control={control}
						render={({ field: { onChange, value, ...field } }) => (
							<FormItem className='w-full space-y-2'>
								<FormLabel
									htmlFor='planning_was_planned'
									aria-invalid={!!errors.planning_was_planned}
									aria-required
								>
									{t('planning_was_planned.form_label')}
								</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={(value) => onChange(value === 'true')}
										value={String(value)}
										className='flex flex-col md:flex-row gap-4 pt-2 pl-2'
										{...field}
									>
										<FormItem className='flex items-center'>
											<FormControl>
												<RadioGroupItem className='size-5' value='true' />
											</FormControl>
											<FormLabel className='font-normal text-base'>
												{t('planning_was_planned.options.radio_true')}
											</FormLabel>
										</FormItem>
										<FormItem className='flex items-center'>
											<FormControl>
												<RadioGroupItem className='size-5' value='false' />
											</FormControl>
											<FormLabel className='font-normal text-base'>
												{t('planning_was_planned.options.radio_false')}
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
							</FormItem>
						)}
					/>
					{errors.planning_was_planned && (
						<FormMessage>
							{String(errors.planning_was_planned.message)}
						</FormMessage>
					)}
				</div>

				{watch('planning_was_planned') && (
					<>
						<FormItem className='w-full space-y-2'>
							<FormLabel
								className='flex items-center justify-between'
								htmlFor='planning_time'
								aria-invalid={!!errors.planning_time}
							>
								{t('planning_time.form_label')}
							</FormLabel>

							<Controller
								name='planning_time'
								control={control}
								render={({ field }) => (
									<SelectWithSearch
										options={planningStepSelectOptions.planning_time}
										value={field.value}
										onChangeAction={field.onChange}
										hasError={!!errors.planning_time}
									/>
								)}
							/>
							{errors.planning_time && (
								<FormMessage>
									{String(errors.planning_time.message)}
								</FormMessage>
							)}
						</FormItem>

						<FormItem className='w-full space-y-2'>
							<FormLabel
								className='flex items-center justify-between'
								htmlFor='planning_information_sources'
								aria-invalid={!!errors.planning_information_sources}
							>
								{t('planning_information_sources.form_label')}
							</FormLabel>

							<Controller
								name='planning_information_sources'
								control={control}
								render={({ field }) => (
									<SelectWithSearch
										multiple
										optional
										options={
											planningStepSelectOptions.planning_information_sources
										}
										value={field.value}
										onChangeAction={field.onChange}
										hasError={!!errors.planning_information_sources}
									/>
								)}
							/>
							{errors.planning_information_sources && (
								<FormMessage>
									{String(errors.planning_information_sources.message)}
								</FormMessage>
							)}
						</FormItem>
					</>
				)}
			</div>

			<Separator className='opacity-70' />

			<FormItem className='w-full space-y-2'>
				<FormLabel
					className='flex items-center justify-between'
					htmlFor='planning_organization'
					aria-invalid={!!errors.planning_organization}
					aria-required
				>
					{t('planning_organization.form_label')}
				</FormLabel>

				<Controller
					name='planning_organization'
					control={control}
					render={({ field }) => (
						<SelectWithSearch
							options={planningStepSelectOptions.planning_organization}
							value={field.value}
							onChangeAction={field.onChange}
							hasError={!!errors.planning_organization}
						/>
					)}
				/>
				{errors.planning_organization && (
					<FormMessage>
						{String(errors.planning_organization.message)}
					</FormMessage>
				)}
			</FormItem>
		</>
	);
}
