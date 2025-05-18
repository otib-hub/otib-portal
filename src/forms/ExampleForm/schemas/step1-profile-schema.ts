import { objectToSelectOptions } from '@/utils/object-to-select-options';
import { z } from 'zod';

const localizationOptions = {
	tourist_country: {
		br: 'Brasil',
		ar: 'Argentina',
		de: 'Germany',
		fr: 'France',
	},
	tourist_state: {
		SP: 'São Paulo',
		RJ: 'Rio de Janeiro',
		MG: 'Minas Gerais',
		RS: 'Rio Grande do Sul',
	},
	tourist_city: {
		sao_paulo: 'São Paulo',
		rio: 'Rio de Janeiro',
		bh: 'Belo Horizonte',
		poa: 'Porto Alegre',
	},
} as const;

const personalOptions = {
	tourist_age_group: {
		'18-24': '18 a 24 anos',
		'25-34': '25 a 34 anos',
		'35-44': '35 a 44 anos',
		'45-54': '45 a 54 anos',
		'55-64': '55 a 64 anos',
		'65+': '65 anos ou mais',
	},
	tourist_gender: {
		male: 'Masculino',
		female: 'Feminino',
		non_binary: 'Não binário',
		no_answer: 'Prefiro não opiniar',
	},
} as const;

const improvementOptions = {
	tourist_education: {
		ef_inc: 'Ensino fundamental incompleto',
		ef_comp: 'Ensino fundamental completo',
		em_inc: 'Ensino médio incompleto',
		em_comp: 'Ensino médio completo',
		es_inc: 'Ensino superior incompleto',
		es_comp: 'Ensino superior completo',
	},
	tourist_estimated_income: {
		low: 'Menos de R$1.000',
		low_mid: 'R$1.000 - R$3.000',
		mid: 'R$3.000 - R$5.000',
		high_mid: 'R$5.000 - R$10.000',
		high: 'Mais de R$10.000',
		omit: 'Prefiro não informar',
	},
};

export const profileStepSchema = z.object({
	tourist_country: z.string({ required_error: 'País é obrigatório' }),
	tourist_state: z.string({ required_error: 'Estado é obrigatório' }),
	tourist_city: z.string({ required_error: 'Cidade é obrigatória' }),

	tourist_age_group: z.string({ required_error: 'Faixa etária é obrigatória' }),
	tourist_gender: z.string({ required_error: 'Gênero é obrigatório' }),

	tourist_education: z.string({ required_error: 'Escolaridade é obrigatória' }),
	tourist_estimated_income: z.string({
		required_error: 'Renda estimada é obrigatória',
	}),
});

export const profileStepSelectOptions = {
	localization: {
		tourist_country: objectToSelectOptions(localizationOptions.tourist_country),
		tourist_state: objectToSelectOptions(localizationOptions.tourist_state),
		tourist_city: objectToSelectOptions(localizationOptions.tourist_city),
	},
	personal: {
		tourist_age_group: objectToSelectOptions(personalOptions.tourist_age_group),
		tourist_gender: objectToSelectOptions(personalOptions.tourist_gender),
	},
	improvement: {
		tourist_education: objectToSelectOptions(
			improvementOptions.tourist_education
		),
		tourist_estimated_income: objectToSelectOptions(
			improvementOptions.tourist_estimated_income
		),
	},
};

export type ProfileStepType = z.infer<typeof profileStepSchema>;
