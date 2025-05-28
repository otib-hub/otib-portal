import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Controller, useFormContext } from 'react-hook-form';
import {
	ActivitiesStepType,
	getActivitiesStepSelectOptions,
} from '../schemas/step4-activities-schema';
import { SelectWithSearch } from '@/components/ui/select-with-search';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';

export default function ActivitiesStep() {
	const t = useTranslations('forms.ExampleForm.steps.4.fields');
	const activitiesStepSelectOptions = getActivitiesStepSelectOptions(t);
	const {
		control,
		formState: { errors },
	} = useFormContext<ActivitiesStepType>();

	return (
		<>
			<div className='FormFieldsContainer w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-start'>
				<FormItem className='w-full space-y-2'>
					<FormLabel
						className='flex items-center justify-between'
						htmlFor='activities_places_visited'
						aria-invalid={!!errors.activities_places_visited}
						aria-required
					>
						{t('activities_places_visited.form_label')}
					</FormLabel>

					<Controller
						name='activities_places_visited'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								multiple
								options={activitiesStepSelectOptions.activities_places_visited}
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.activities_places_visited}
							/>
						)}
					/>
					{errors.activities_places_visited && (
						<FormMessage>
							{String(errors.activities_places_visited.message)}
						</FormMessage>
					)}
				</FormItem>

				<FormItem className='w-full space-y-2'>
					<FormLabel
						htmlFor='activities_events_visited'
						aria-invalid={!!errors.activities_events_visited}
					>
						{t('activities_events_visited.form_label')}
					</FormLabel>

					<Controller
						name='activities_events_visited'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								optional
								multiple
								options={activitiesStepSelectOptions.activities_events_visited}
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.activities_events_visited}
							/>
						)}
					/>
					{errors.activities_events_visited && (
						<FormMessage>
							{String(errors.activities_events_visited.message)}
						</FormMessage>
					)}
				</FormItem>
			</div>

			<Separator className='opacity-70' />

			<div className='FormFieldsContainer w-full grid grid-cols-1 gap-8 items-start justify-start'>
				<FormItem className='w-full md:w-[50%] space-y-2'>
					<FormLabel
						htmlFor='activities_events_visited'
						aria-invalid={!!errors.activities_events_visited}
					>
						{t('activities_used_apps.form_label')}
					</FormLabel>

					<Controller
						name='activities_used_apps'
						control={control}
						render={({ field }) => (
							<SelectWithSearch
								optional
								multiple
								options={activitiesStepSelectOptions.activities_used_apps}
								value={field.value}
								onChangeAction={field.onChange}
								hasError={!!errors.activities_used_apps}
							/>
						)}
					/>
					{errors.activities_used_apps && (
						<FormMessage>
							{String(errors.activities_used_apps.message)}
						</FormMessage>
					)}
				</FormItem>
			</div>
		</>
	);
}
