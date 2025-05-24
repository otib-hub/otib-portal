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
		'0': '18 a 24 anos',
		'1': '25 a 34 anos',
		'2': '35 a 44 anos',
		'3': '45 a 54 anos',
		'4': '55 a 64 anos',
		'5': '65 anos ou mais',
	},
	tourist_gender: {
		male: 'Masculino',
		female: 'Feminino',
		non_binary: 'Não binário',
		other: 'Outro',
		omit: 'Prefiro não informar',
	},
} as const;

const improvementOptions = {
	tourist_education: {
		'0': 'Ensino fundamental incompleto',
		'1': 'Ensino fundamental completo',
		'2': 'Ensino médio incompleto',
		'3': 'Ensino médio completo',
		'4': 'Ensino superior incompleto',
		'5': 'Ensino superior completo',
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
	tourist_country: z.string({ required_error: 'Campo obrigatório' }),
	tourist_state: z.string({ required_error: 'Campo obrigatório' }),
	tourist_city: z.string({ required_error: 'Campo obrigatório' }),

	tourist_age_group: z.string({ required_error: 'Campo obrigatório' }),
	tourist_gender: z.string({ required_error: 'Gênero é obrigatório' }),

	tourist_education: z.string({ required_error: 'Campo obrigatório' }),
	tourist_estimated_income: z.string({
		required_error: 'Campo obrigatório',
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
