import NpsSlider from '@/components/NpsSlider';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Controller, useFormContext } from 'react-hook-form';
import { ActivitiesStepType } from '../schemas/step3-activities-schema';

export default function ActivitiesStep() {
	const {
		control,
		// register, -> register para inputs, control para selects
		formState: { errors },
	} = useFormContext<ActivitiesStepType>();

	return (
		<div>
			<FormItem className='w-full space-y-2'>
				<FormLabel htmlFor='nps_score' aria-invalid={!!errors.nps_score}>
					Avaliação NPS
				</FormLabel>

				<Controller
					name='nps_score'
					control={control}
					render={({ field }) => (
						<NpsSlider
							id='nps_score'
							value={field.value}
							onChangeAction={field.onChange}
							hasError={!!errors.nps_score}
						/>
					)}
				/>
				{errors.nps_score && (
					<FormMessage>{String(errors.nps_score.message)}</FormMessage>
				)}
			</FormItem>
		</div>
	);
}
