import { Separator } from '@/components/ui/separator';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import {
	getProfileStepSelectOptions,
	ProfileStepType,
} from '../schemas/step1-profile-schema';
import { SelectWithSearch } from '@/components/ui/select-with-search';
import { useTranslations } from 'next-intl';
import { useLocations } from '@/hooks/fetching/use-locations';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileStep() {
	const t = useTranslations('forms.IndividualResearchForm.steps.1.fields');
	const profileStepSelectOptions = getProfileStepSelectOptions(t);
	const {
		control,
		formState: { errors },
	} = useFormContext<ProfileStepType>();

	const selectedCountry = useWatch({ control, name: 'tourist_country' });
	const selectedState = useWatch({ control, name: 'tourist_state' });
	const { countries, states, cities } = useLocations({
		selectedCountry,
		selectedState,
	});

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist_country'
						aria-invalid={!!errors.tourist_country}
						aria-required
					>
						{t('tourist_country.form_label')}
					</FormLabel>

					<Controller
						name='tourist_country'
						control={control}
						render={({ field }) => {
							if (countries.isLoading) {
								return (
									<Skeleton className='w-full flex-grow flex justify-between items-center text-base bg-input/20 px-3 py-5 font-normal' />
								);
							}

							return (
								<SelectWithSearch
									id='tourist_country'
									value={field.value}
									onChangeAction={field.onChange}
									hasError={!!errors.tourist_country}
									options={countries.options}
								/>
							);
						}}
					/>

					{errors.tourist_country && (
						<FormMessage>{String(errors.tourist_country.message)}</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist_state'
						aria-invalid={!!errors.tourist_state}
						aria-required
					>
						{t('tourist_state.form_label')}
					</FormLabel>
					<Controller
						name='tourist_state'
						control={control}
						render={({ field }) => {
							if (states.isLoading) {
								return (
									<Skeleton className='w-full flex-grow flex justify-between items-center text-base bg-input/20 px-3 py-5 font-normal' />
								);
							}

							return (
								<SelectWithSearch
									id='tourist_state'
									value={field.value}
									disabled={!selectedCountry || states.options.length === 0}
									onChangeAction={field.onChange}
									hasError={!!errors.tourist_state}
									options={states.options ?? []}
								/>
							);
						}}
					/>
					{errors.tourist_state && (
						<FormMessage>{String(errors.tourist_state.message)}</FormMessage>
					)}
				</FormItem>

				{/* Cidade */}
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist_city'
						aria-invalid={!!errors.tourist_city}
						aria-required
					>
						{t('tourist_city.form_label')}
					</FormLabel>
					<Controller
						name='tourist_city'
						control={control}
						render={({ field }) => {
							if (cities.isLoading) {
								return (
									<Skeleton className='w-full flex-grow flex justify-between items-center text-base bg-input/20 px-3 py-5 font-normal' />
								);
							}

							return (
								<SelectWithSearch
									id='tourist_city'
									value={field.value}
									disabled={
										!selectedCountry ||
										!selectedState ||
										cities.options.length === 0
									}
									onChangeAction={field.onChange}
									hasError={!!errors.tourist_city}
									options={cities.options ?? []}
								/>
							);
						}}
					/>
					{errors.tourist_city && (
						<FormMessage>{String(errors.tourist_city.message)}</FormMessage>
					)}
				</FormItem>
			</div>

			<Separator className='opacity-70' />

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist_age_group'
						aria-invalid={!!errors.tourist_age_group}
						aria-required
					>
						{t('tourist_age_group.form_label')}
					</FormLabel>
					<Controller
						name='tourist_age_group'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist_age_group'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.tourist_age_group}
								options={profileStepSelectOptions.personal.tourist_age_group}
							/>
						)}
					/>
					{errors.tourist_age_group && (
						<FormMessage>
							{String(errors.tourist_age_group.message)}
						</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist_gender'
						aria-invalid={!!errors.tourist_gender}
						aria-required
					>
						{t('tourist_gender.form_label')}
					</FormLabel>
					<Controller
						name='tourist_gender'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist_gender'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.tourist_gender}
								options={profileStepSelectOptions.personal.tourist_gender}
							/>
						)}
					/>
					{errors.tourist_gender && (
						<FormMessage>{String(errors.tourist_gender.message)}</FormMessage>
					)}
				</FormItem>
			</div>

			<Separator className='opacity-70' />

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist_education'
						aria-invalid={!!errors.tourist_education}
						aria-required
					>
						{t('tourist_education.form_label')}
					</FormLabel>
					<Controller
						name='tourist_education'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist_education'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.tourist_education}
								options={profileStepSelectOptions.improvement.tourist_education}
							/>
						)}
					/>
					{errors.tourist_education && (
						<FormMessage>
							{String(errors.tourist_education.message)}
						</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist_estimated_income'
						aria-invalid={!!errors.tourist_estimated_income}
						aria-required
					>
						{t('tourist_estimated_income.form_label')}
					</FormLabel>
					<Controller
						name='tourist_estimated_income'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist_estimated_income'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.tourist_estimated_income}
								options={
									profileStepSelectOptions.improvement.tourist_estimated_income
								}
							/>
						)}
					/>
					{errors.tourist_estimated_income && (
						<FormMessage>
							{String(errors.tourist_estimated_income.message)}
						</FormMessage>
					)}
				</FormItem>
			</div>
		</>
	);
}
