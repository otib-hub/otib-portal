import { TFunction } from '@/@types/next-intl';
import { objectToSelectOptions } from '@/utils/object-to-select-options';
import { z } from 'zod';

/*
    8. Expectativas e nível de satisfação 
        8.1.  Antes da visita 
        8.2. Após a visita 
			Opções de resposta:
				a) Superou
				b) Sim, plenamente
				c) Atingidas em parte
				d) Não foram atingidas
				e) Decepcionou
*/

// const satisfactionLevelOptions = {
// 	'0': 'Superou',
// 	'1': 'Sim, plenamente',
// 	'2': 'Atingidas em parte',
// 	'3': 'Não foram atingidas',
// 	'4': 'Decepcionou',
// } as const;

export function getEvaluationStepSchema(t: TFunction<'forms'>) {
	return z.object({
		evaluation_recommendation_rate: z
			.number({
				message: t('errors.field_required'),
			})
			.min(1)
			.max(10),
		evaluation_dissatisfactions: z.array(z.string()).optional(),

		evaluation_expectation_rate: z
			.number({
				message: t('errors.field_required'),
			})
			.min(1)
			.max(10),
		evaluation_satisfaction_rate: z
			.number({
				message: t('errors.field_required'),
			})
			.min(1)
			.max(10),

		evaluation_return_intent_rate: z
			.number({
				message: t('errors.field_required'),
			})
			.min(1)
			.max(10),
		evaluation_open_opinion: z.string().max(1000).optional(),
	});
}

export function getEvaluationStepSelectOptions(
	t: TFunction<'forms.TouristIndividualResearchForm.steps.5.fields'>
) {
	return {
		evaluation_dissatisfactions: objectToSelectOptions({
			'1': t('evaluation_dissatisfactions.options.0'),
			'2': t('evaluation_dissatisfactions.options.1'),
			'3': t('evaluation_dissatisfactions.options.2'),
			'4': t('evaluation_dissatisfactions.options.3'),
			'5': t('evaluation_dissatisfactions.options.4'),
			'6': t('evaluation_dissatisfactions.options.5'),
			'7': t('evaluation_dissatisfactions.options.6'),
			'8': t('evaluation_dissatisfactions.options.7'),
			'9': t('evaluation_dissatisfactions.options.8'),
			'10': t('evaluation_dissatisfactions.options.9'),
			'11': t('evaluation_dissatisfactions.options.10'),
			'12': t('evaluation_dissatisfactions.options.11'),
			'13': t('evaluation_dissatisfactions.options.12'),
			'14': t('evaluation_dissatisfactions.options.13'),
			'15': t('evaluation_dissatisfactions.options.14'),
			'16': t('evaluation_dissatisfactions.options.15'),
			'17': t('evaluation_dissatisfactions.options.16'),
			'18': t('evaluation_dissatisfactions.options.17'),
			'19': t('evaluation_dissatisfactions.options.18'),
			'20': t('evaluation_dissatisfactions.options.19'),
			'21': t('evaluation_dissatisfactions.options.20'),
			'22': t('evaluation_dissatisfactions.options.21'),
			'23': t('evaluation_dissatisfactions.options.22'),
			'24': t('evaluation_dissatisfactions.options.23'),
			'25': t('evaluation_dissatisfactions.options.24'),
			'26': t('evaluation_dissatisfactions.options.25'),
		}),
	};
}

export type EvaluationStepType = z.infer<
	ReturnType<typeof getEvaluationStepSchema>
>;
