import { Separator } from '@/components/ui/separator';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Controller, useFormContext } from 'react-hook-form';
import {
	profileStepSelectOptions,
	ProfileStepType,
} from '../schemas/profile-schema';
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
					<FormLabel htmlFor='tourist-country' aria-invalid={!!errors.country}>
						País
					</FormLabel>
					<Controller
						name='country'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist-country'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.country}
								options={profileStepSelectOptions.localization.country}
								placeholder='Selecione seu país'
							/>
						)}
					/>
					{errors.country && (
						<FormMessage>{String(errors.country.message)}</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel htmlFor='tourist-state' aria-invalid={!!errors.state}>
						Estado
					</FormLabel>
					<Controller
						name='state'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist-state'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.state}
								options={profileStepSelectOptions.localization.state}
								placeholder='Selecione seu estado'
							/>
						)}
					/>
					{errors.state && (
						<FormMessage>{String(errors.state.message)}</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel htmlFor='tourist-city' aria-invalid={!!errors.city}>
						Cidade
					</FormLabel>
					<Controller
						name='city'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist-city'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.city}
								options={profileStepSelectOptions.localization.city}
								placeholder='Selecione sua cidade'
							/>
						)}
					/>
					{errors.city && (
						<FormMessage>{String(errors.city.message)}</FormMessage>
					)}
				</FormItem>
			</div>

			<Separator className='block md:hidden' />

			<div className='flex gap-8 md:gap-6 flex-wrap md:flex-nowrap items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist-age_group'
						aria-invalid={!!errors.age_group}
					>
						Faixa etária
					</FormLabel>
					<Controller
						name='age_group'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist-age_group'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.age_group}
								options={profileStepSelectOptions.personal.age_group}
								placeholder='Selecione sua faixa etária'
							/>
						)}
					/>
					{errors.age_group && (
						<FormMessage>{String(errors.age_group.message)}</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel htmlFor='tourist-gender' aria-invalid={!!errors.gender}>
						Gênero
					</FormLabel>
					<Controller
						name='gender'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist-gender'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.gender}
								options={profileStepSelectOptions.personal.gender}
								placeholder='Selecione seu gênero'
							/>
						)}
					/>
					{errors.gender && (
						<FormMessage>{String(errors.gender.message)}</FormMessage>
					)}
				</FormItem>
			</div>

			<Separator className='block md:hidden' />

			<div className='flex gap-8 md:gap-6 flex-wrap md:flex-nowrap items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist-education'
						aria-invalid={!!errors.education}
					>
						Escolaridade
					</FormLabel>
					<Controller
						name='education'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist-education'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.education}
								options={profileStepSelectOptions.improvement.education}
								placeholder='Selecione sua escolaridade'
							/>
						)}
					/>
					{errors.education && (
						<FormMessage>{String(errors.education.message)}</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist-estimated_income'
						aria-invalid={!!errors.estimated_income}
					>
						Renda estimada
					</FormLabel>
					<Controller
						name='estimated_income'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist-estimated_income'
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.estimated_income}
								options={profileStepSelectOptions.improvement.estimated_income}
								placeholder='Selecione sua renda estimada'
							/>
						)}
					/>
					{errors.estimated_income && (
						<FormMessage>{String(errors.estimated_income.message)}</FormMessage>
					)}
				</FormItem>
			</div>
		</>
	);
}
