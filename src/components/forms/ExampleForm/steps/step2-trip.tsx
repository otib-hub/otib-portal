import { SelectWithSearch } from '@/components/ui/select-with-search';
import { Controller, useFormContext } from 'react-hook-form';
import {
	tripStepSelectOptions,
	TripStepType,
} from '../schemas/step2-trip-schema';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

export default function TripStep() {
	const {
		control,
		// register, -> register para inputs, control para selects
		formState: { errors },
	} = useFormContext<TripStepType>();

	return (
		<>
			<div className='flex gap-8 md:gap-6 flex-wrap md:flex-nowrap items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist-trip_reasons'
						aria-invalid={!!errors.trip_reasons}
					>
						Motivo(s) da viagem
					</FormLabel>

					<Controller
						name='trip_reasons'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist-trip_reasons'
								multiple
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.trip_reasons}
								options={tripStepSelectOptions.trip_reasons}
								placeholder='Selecione ao menos um'
							/>
						)}
					/>
					{errors.trip_reasons && (
						<FormMessage>{String(errors.trip_reasons.message)}</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist-trip_vehicles'
						aria-invalid={!!errors.trip_vehicles}
					>
						Veículo(s) utilizado(s)
					</FormLabel>

					<Controller
						name='trip_vehicles'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								id='tourist-trip_vehicles'
								multiple
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.trip_vehicles}
								options={tripStepSelectOptions.trip_vehicles}
								placeholder='Selecione ao menos um'
							/>
						)}
					/>
					{errors.trip_vehicles && (
						<FormMessage>{String(errors.trip_vehicles.message)}</FormMessage>
					)}
				</FormItem>
			</div>

			<Separator className='block md:hidden' />

			<div className='flex gap-8 md:gap-6 flex-wrap md:flex-nowrap items-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='tourist-trip_hosting_types'
						aria-invalid={!!errors.trip_hosting_types}
					>
						Tipo de hospedagem
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

			<pre className='text-center animate-pulse'>Continuar campos daqui</pre>
		</>
	);
}
