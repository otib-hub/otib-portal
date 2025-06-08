import { SelectWithSearch } from '@/components/ui/select-with-search';
import { Controller, useFormContext } from 'react-hook-form';
import {
	getTripStepSelectOptions,
	TripStepType,
} from '../schemas/step3-trip-schema';
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTranslations } from 'next-intl';

export default function TripStep() {
	const t = useTranslations('forms.IndividualResearchForm.steps.3.fields');
	const tripStepSelectOptions = getTripStepSelectOptions(t);
	const {
		control,
		watch,
		formState: { errors },
	} = useFormContext<TripStepType>();

	return (
		<>
			<div className='FormFieldsContainer w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start'>
				<div className='RadioGroupContainer flex flex-col'>
					<Controller
						name='trip_has_reincidence'
						control={control}
						render={({ field: { onChange, value, ...field } }) => (
							<FormItem className='w-full space-y-2'>
								<FormLabel
									htmlFor='trip_has_reincidence'
									aria-invalid={!!errors.trip_has_reincidence}
									aria-required
								>
									{t('trip_has_reincidence.form_label')}
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
												{t('trip_has_reincidence.options.radio_true')}
											</FormLabel>
										</FormItem>
										<FormItem className='flex items-center'>
											<FormControl>
												<RadioGroupItem className='size-5' value='false' />
											</FormControl>
											<FormLabel className='font-normal text-base'>
												{t('trip_has_reincidence.options.radio_false')}
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
							</FormItem>
						)}
					/>
					{errors.trip_has_reincidence && (
						<FormMessage>
							{String(errors.trip_has_reincidence.message)}
						</FormMessage>
					)}
				</div>

				{watch('trip_has_reincidence') && (
					<FormItem className='space-y-2 w-full'>
						<FormLabel
							htmlFor='trip_reincidence'
							aria-invalid={!!errors.trip_reincidence}
						>
							{t('trip_reincidence.form_label')}
						</FormLabel>

						<Controller
							name='trip_reincidence'
							control={control}
							render={({ field }) => (
								<SelectWithSearch
									id='trip_reincidence'
									value={field.value}
									onChangeAction={field.onChange}
									hasError={!!errors.trip_reincidence}
									options={tripStepSelectOptions.trip_reincidence}
								/>
							)}
						/>
						{errors.trip_reincidence && (
							<FormMessage>
								{String(errors.trip_reincidence.message)}
							</FormMessage>
						)}
					</FormItem>
				)}
			</div>

			<Separator className='opacity-70' />

			<div className='FormFieldsContainer w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start'>
				<div className='RadioGroupContainer flex flex-col'>
					<Controller
						name='trip_know_ibiapaba_mirantes'
						control={control}
						render={({ field: { onChange, value, ...field } }) => (
							<FormItem className='w-full space-y-2'>
								<FormLabel
									htmlFor='trip_know_ibiapaba_mirantes'
									aria-invalid={!!errors.trip_know_ibiapaba_mirantes}
									aria-required
								>
									{t('trip_know_ibiapaba_mirantes.form_label')}
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
												{t('trip_know_ibiapaba_mirantes.options.radio_true')}
											</FormLabel>
										</FormItem>
										<FormItem className='flex items-center'>
											<FormControl>
												<RadioGroupItem className='size-5' value='false' />
											</FormControl>
											<FormLabel className='font-normal text-base'>
												{t('trip_know_ibiapaba_mirantes.options.radio_false')}
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
							</FormItem>
						)}
					/>
					{errors.trip_know_ibiapaba_mirantes && (
						<FormMessage>
							{String(errors.trip_know_ibiapaba_mirantes.message)}
						</FormMessage>
					)}
				</div>

				{watch('trip_know_ibiapaba_mirantes') && (
					<FormItem className='space-y-2 w-full'>
						<FormLabel
							htmlFor='trip_how_know_ibiapaba_mirantes'
							aria-invalid={!!errors.trip_how_know_ibiapaba_mirantes}
						>
							{t('trip_how_know_ibiapaba_mirantes.form_label')}
						</FormLabel>

						<Controller
							name='trip_how_know_ibiapaba_mirantes'
							control={control}
							render={({ field }) => (
								<SelectWithSearch
									id='trip_how_know_ibiapaba_mirantes'
									multiple
									optional
									value={field.value}
									onChangeAction={field.onChange}
									hasError={!!errors.trip_how_know_ibiapaba_mirantes}
									options={
										tripStepSelectOptions.trip_how_know_ibiapaba_mirantes
									}
								/>
							)}
						/>
						{errors.trip_how_know_ibiapaba_mirantes && (
							<FormMessage>
								{String(errors.trip_how_know_ibiapaba_mirantes.message)}
							</FormMessage>
						)}
					</FormItem>
				)}
			</div>

			<Separator className='opacity-70' />

			<div className='FormFieldsContainer w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='trip_reasons'
						aria-invalid={!!errors.trip_reasons}
						aria-required
					>
						{t('trip_reasons.form_label')}
					</FormLabel>

					<Controller
						name='trip_reasons'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='trip_reasons'
								multiple
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.trip_reasons}
								options={tripStepSelectOptions.trip_reasons}
							/>
						)}
					/>
					{errors.trip_reasons && (
						<FormMessage>{String(errors.trip_reasons.message)}</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='trip_stay_time'
						aria-invalid={!!errors.trip_stay_time}
						aria-required
					>
						{t('trip_stay_time.form_label')}
					</FormLabel>

					<Controller
						name='trip_stay_time'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								options={tripStepSelectOptions.trip_stay_time}
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.trip_stay_time}
							/>
						)}
					/>
					{errors.trip_stay_time && (
						<FormMessage>{String(errors.trip_stay_time.message)}</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='trip_vehicles'
						aria-invalid={!!errors.trip_vehicles}
						aria-required
					>
						{t('trip_vehicles.form_label')}
					</FormLabel>

					<Controller
						name='trip_vehicles'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='trip_vehicles'
								multiple
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.trip_vehicles}
								options={tripStepSelectOptions.trip_vehicles}
							/>
						)}
					/>
					{errors.trip_vehicles && (
						<FormMessage>{String(errors.trip_vehicles.message)}</FormMessage>
					)}
				</FormItem>
			</div>

			<Separator className='opacity-70' />

			<div className='FormFieldsContainer w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='trip_average_diary_expense'
						aria-invalid={!!errors.trip_average_diary_expense}
						aria-required
					>
						{t('trip_average_diary_expense.form_label')}
					</FormLabel>

					<Controller
						name='trip_average_diary_expense'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								options={tripStepSelectOptions.trip_average_diary_expense}
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.trip_average_diary_expense}
							/>
						)}
					/>
					{errors.trip_average_diary_expense && (
						<FormMessage>
							{String(errors.trip_average_diary_expense.message)}
						</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='trip_hosting_types'
						aria-invalid={!!errors.trip_hosting_types}
						aria-required
					>
						{t('trip_hosting_types.form_label')}
					</FormLabel>

					<Controller
						name='trip_hosting_types'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								multiple
								options={tripStepSelectOptions.trip_hosting_types}
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.trip_hosting_types}
							/>
						)}
					/>
					{errors.trip_hosting_types && (
						<FormMessage>
							{String(errors.trip_hosting_types.message)}
						</FormMessage>
					)}
				</FormItem>
			</div>
		</>
	);
}
