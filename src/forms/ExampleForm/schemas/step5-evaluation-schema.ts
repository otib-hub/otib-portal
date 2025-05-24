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

const dissatisfactionOptions = {
	'0': 'Limpeza',
	'1': 'Sinalização das ruas',
	'2': 'Sinalização turística',
	'3': 'Conservação das ruas e mobiliário urbano',
	'4': 'Rodovia de acesso',
	'5': 'Estacionamento',
	'6': 'Táxi',
	'7': 'Mobilidade/Transporte',
	'8': 'Bancos/caixas eletrônicos',
	'9': 'Segurança',
	'10': 'Iluminação',
	'11': 'Preços',
	'12': 'Site institucional',
	'13': 'Hospitalidade dos moradores',
	'14': 'Hospitalidade dos prestadores de serviços e comércio',
	'15': 'Receptivo',
	'16': 'Hospedagem',
	'17': 'Restaurantes/gastronomia',
	'18': 'Guia de turismo/Condutor ambiental',
	'19': 'Artesanato',
	'20': 'Comércio em geral',
	'21': 'Manifestações culturais',
	'22': 'Atrativos naturais',
	'23': 'Eventos',
	'24': 'Opções de lazer',
	'25': 'Diversões noturnas',
} as const;

export const evaluationStepSchema = z.object({
	evaluation_recommendation_rate: z.number().min(1).max(10).optional(),
	evaluation_dissatisfactions: z.array(z.string()).optional(),

	evaluation_expectation_rate: z.number().min(1).max(10).optional(),
	evaluation_satisfaction_rate: z.number().min(1).max(10).optional(),

	evaluation_return_intent_rate: z.number().min(1).max(10).optional(),
	evaluation_open_opinion: z.string().max(1000).optional(),
});

export const evaluationStepSelectOptions = {
	evaluation_dissatisfactions: objectToSelectOptions(dissatisfactionOptions),
};

export type EvaluationStepType = z.infer<typeof evaluationStepSchema>;
