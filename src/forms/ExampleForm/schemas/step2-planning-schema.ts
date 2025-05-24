import { objectToSelectOptions } from '@/utils/object-to-select-options';
import { z } from 'zod';

const planningTimeOptions = {
	'0': 'Menos de 1 mês',
	'1': '1 a 3 meses',
	'2': '3 a 6 meses',
	'3': 'Mais de 6 meses',
} as const;

const informationSourcesOptions = {
	'0': 'Sites de viagem',
	'1': 'Redes sociais',
	'2': 'Recomendações de amigos',
	'3': 'Agências de viagem',
	'4': 'Guias impressos',
	'5': 'Outro',
} as const;

const organizationOptions = {
	'0': 'Viagem individual',
	'1': 'Viagem em casal',
	'2': 'Viagem em família',
	'3': 'Viagem em grupo',
	'4': 'Com agência de viagens',
	'5': 'Outro',
} as const;

export const planningStepSchema = z.object({
	planning_was_planned: z.boolean({ required_error: 'Campo obrigatório' }),
	planning_time: z.string().optional(),
	planning_information_sources: z.array(z.string()).optional(),
	planning_organization: z.string({ required_error: 'Campo obrigatório' }),
});

export const planningStepSelectOptions = {
	planning_time: objectToSelectOptions(planningTimeOptions),
	planning_information_sources: objectToSelectOptions(
		informationSourcesOptions
	),
	planning_organization: objectToSelectOptions(organizationOptions),
};

export type PlanningStepType = z.infer<typeof planningStepSchema>;
