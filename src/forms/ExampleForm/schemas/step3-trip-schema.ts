import { TFunction } from '@/@types/next-intl';
import { objectToSelectOptions } from '@/utils/object-to-select-options';
import { z } from 'zod';

export function getTripStepSchema(t: TFunction<'forms'>) {
	return z.object({
		trip_has_reincidence: z.boolean({
			required_error: t('errors.field_required'),
		}),
		trip_reincidence: z.string().optional(),
		trip_know_ibiapaba_mirantes: z.boolean({
			required_error: t('errors.field_required'),
		}),
		trip_how_know_ibiapaba_mirantes: z
			.array(z.string(), {
				required_error: t('errors.field_require_at_least_one'),
			})
			.optional(),

		trip_reasons: z
			.array(z.string(), {
				required_error: t('errors.field_require_at_least_one'),
			})
			.min(1, { message: t('errors.field_require_at_least_one') }),
		trip_vehicles: z
			.array(z.string(), {
				required_error: t('errors.field_require_at_least_one'),
			})
			.min(1, { message: t('errors.field_require_at_least_one') }),
		trip_stay_time: z.string({
			required_error: t('errors.field_required'),
		}),

		trip_average_diary_expense: z.string({
			required_error: t('errors.field_required'),
		}),
		trip_hosting_types: z
			.array(z.string(), {
				required_error: t('errors.field_require_at_least_one'),
			})
			.min(1, { message: t('errors.field_require_at_least_one') }),
	});
}

export function getTripStepSelectOptions(
	t: TFunction<'forms.ExampleForm.steps.3.fields'>
) {
	return {
		trip_reincidence: objectToSelectOptions({
			'1': t('trip_reincidence.options.0'),
			'2': t('trip_reincidence.options.1'),
			'3': t('trip_reincidence.options.2'),
			'4': t('trip_reincidence.options.3'),
			'5': t('trip_reincidence.options.4'),
		}),
		trip_how_know_ibiapaba_mirantes: objectToSelectOptions({
			'1': t('trip_how_know_ibiapaba_mirantes.options.0'),
			'2': t('trip_how_know_ibiapaba_mirantes.options.1'),
			'3': t('trip_how_know_ibiapaba_mirantes.options.2'),
			'4': t('trip_how_know_ibiapaba_mirantes.options.3'),
			'5': t('trip_how_know_ibiapaba_mirantes.options.4'),
			'6': t('trip_how_know_ibiapaba_mirantes.options.5'),
			'7': t('trip_how_know_ibiapaba_mirantes.options.6'),
			'8': t('trip_how_know_ibiapaba_mirantes.options.7'),
			'9': t('trip_how_know_ibiapaba_mirantes.options.8'),
			'10': t('trip_how_know_ibiapaba_mirantes.options.9'),
			'11': t('trip_how_know_ibiapaba_mirantes.options.10'),
			'12': t('trip_how_know_ibiapaba_mirantes.options.11'),
		}),
		trip_reasons: objectToSelectOptions({
			'1': t('trip_reasons.options.0'), // no caso de 'Lazer, Passeios/Descanso' -> (aqui seria interessante abrir para perguntar a principal motivação (aventura, atrativos naturais, cultura, gastronomia, religião, rural, eventos..)
			'2': t('trip_reasons.options.1'),
			'3': t('trip_reasons.options.2'),
			'4': t('trip_reasons.options.3'),
			'5': t('trip_reasons.options.4'),
			'6': t('trip_reasons.options.5'),
			'7': t('trip_reasons.options.6'),
			'8': t('trip_reasons.options.7'),
			'9': t('trip_reasons.options.8'),
		}),
		trip_stay_time: objectToSelectOptions({
			'1': t('trip_stay_time.options.0'),
			'2': t('trip_stay_time.options.1'),
			'3': t('trip_stay_time.options.2'),
			'4': t('trip_stay_time.options.3'),
			'5': t('trip_stay_time.options.4'),
			'6': t('trip_stay_time.options.5'),
			'7': t('trip_stay_time.options.6'),
			'8': t('trip_stay_time.options.7'),
		}),
		trip_vehicles: objectToSelectOptions({
			'1': t('trip_vehicles.options.0'),
			'2': t('trip_vehicles.options.1'),
			'3': t('trip_vehicles.options.2'),
			'4': t('trip_vehicles.options.3'),
			'5': t('trip_vehicles.options.4'),
			'6': t('trip_vehicles.options.5'),
			'7': t('trip_vehicles.options.6'),
			'8': t('trip_vehicles.options.7'),
			'9': t('trip_vehicles.options.8'),
		}),
		trip_average_diary_expense: objectToSelectOptions({
			'1': t('trip_average_diary_expense.options.0'),
			'2': t('trip_average_diary_expense.options.1'),
			'3': t('trip_average_diary_expense.options.2'),
			'4': t('trip_average_diary_expense.options.3'),
			'5': t('trip_average_diary_expense.options.4'),
			'6': t('trip_average_diary_expense.options.5'),
			'7': t('trip_average_diary_expense.options.6'),
			'8': t('trip_average_diary_expense.options.7'),
		}),
		trip_hosting_types: objectToSelectOptions({
			'1': t('trip_hosting_types.options.0'),
			'2': t('trip_hosting_types.options.1'),
			'3': t('trip_hosting_types.options.2'),
			'4': t('trip_hosting_types.options.3'),
			'5': t('trip_hosting_types.options.4'),
			'6': t('trip_hosting_types.options.5'),
			'7': t('trip_hosting_types.options.6'),
			'8': t('trip_hosting_types.options.7'),
			'9': t('trip_hosting_types.options.8'),
			'10': t('trip_hosting_types.options.9'),
		}),
	};
}

export type TripStepType = z.infer<ReturnType<typeof getTripStepSchema>>;
