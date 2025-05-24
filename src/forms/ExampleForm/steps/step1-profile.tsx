import { Separator } from '@/components/ui/separator';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Controller, useFormContext } from 'react-hook-form';
import {
	profileStepSelectOptions,
	ProfileStepType,
} from '../schemas/step1-profile-schema';
import { SelectWithSearch } from '@/components/ui/select-with-search';

export default function ProfileStep() {
	const {
		control,
		// register, -> register para inputs, control para selects
		formState: { errors },
	} = useFormContext<ProfileStepType>();

	return (
		<>
			<div className='flex gap-8 md:gap-6 flex-wrap md:flex-nowrap items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist_country'
						aria-invalid={!!errors.tourist_country}
						aria-required
					>
						País
					</FormLabel>
					<Controller
						name='tourist_country'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist_country'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.tourist_country}
								options={profileStepSelectOptions.localization.tourist_country}
							/>
						)}
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
						Estado
					</FormLabel>
					<Controller
						name='tourist_state'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist_state'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.tourist_state}
								options={profileStepSelectOptions.localization.tourist_state}
							/>
						)}
					/>
					{errors.tourist_state && (
						<FormMessage>{String(errors.tourist_state.message)}</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist_city'
						aria-invalid={!!errors.tourist_city}
						aria-required
					>
						Cidade
					</FormLabel>
					<Controller
						name='tourist_city'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist_city'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.tourist_city}
								options={profileStepSelectOptions.localization.tourist_city}
							/>
						)}
					/>
					{errors.tourist_city && (
						<FormMessage>{String(errors.tourist_city.message)}</FormMessage>
					)}
				</FormItem>
			</div>

			<Separator className='opacity-70' />

			<div className='flex gap-8 md:gap-6 flex-wrap md:flex-nowrap items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist_age_group'
						aria-invalid={!!errors.tourist_age_group}
						aria-required
					>
						Faixa etária
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
						Gênero
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

			<div className='flex gap-8 md:gap-6 flex-wrap md:flex-nowrap items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist_education'
						aria-invalid={!!errors.tourist_education}
						aria-required
					>
						Escolaridade
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
						Renda estimada
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
