import { z } from 'zod';

export function objectToSelectOptions<T extends Record<string, string>>(
	options: T
) {
	return Object.entries(options).map(([value, label]) => ({ value, label }));
}

const localizationOptions = {
	country: {
		br: 'Brasil',
		ar: 'Argentina',
		de: 'Germany',
		fr: 'France',
	},
	state: {
		SP: 'São Paulo',
		RJ: 'Rio de Janeiro',
		MG: 'Minas Gerais',
		RS: 'Rio Grande do Sul',
	},
	city: {
		sao_paulo: 'São Paulo',
		rio: 'Rio de Janeiro',
		bh: 'Belo Horizonte',
		poa: 'Porto Alegre',
	},
} as const;

const personalOptions = {
	age_group: {
		'18-24': '18 a 24 anos',
		'25-34': '25 a 34 anos',
		'35-44': '35 a 44 anos',
		'45-54': '45 a 54 anos',
		'55-64': '55 a 64 anos',
		'65+': '65 anos ou mais',
	},
	gender: {
		male: 'Masculino',
		female: 'Feminino',
		non_binary: 'Não binário',
		no_answer: 'Prefiro não opiniar',
	},
} as const;

const improvementOptions = {
	education: {
		ef_inc: 'Ensino fundamental incompleto',
		ef_comp: 'Ensino fundamental completo',
		em_inc: 'Ensino médio incompleto',
		em_comp: 'Ensino médio completo',
		es_inc: 'Ensino superior incompleto',
		es_comp: 'Ensino superior completo',
	},
	estimated_income: {
		low: 'Menos de R$1.000',
		low_mid: 'R$1.000 - R$3.000',
		mid: 'R$3.000 - R$5.000',
		high_mid: 'R$5.000 - R$10.000',
		high: 'Mais de R$10.000',
		omit: 'Prefiro não informar',
	},
};

export const profileStepSchema = z.object({
	country: z.enum(
		Object.keys(localizationOptions.country) as [
			keyof typeof localizationOptions.country
		],
		{ message: 'País é obrigatório' }
	),
	state: z.enum(
		Object.keys(localizationOptions.state) as [
			keyof typeof localizationOptions.state
		],
		{ message: 'Estado é obrigatório' }
	),
	city: z.enum(
		Object.keys(localizationOptions.city) as [
			keyof typeof localizationOptions.city
		],
		{ message: 'Cidade é obrigatória' }
	),

	age_group: z.enum(
		Object.keys(personalOptions.age_group) as [
			keyof typeof personalOptions.age_group
		],
		{ message: 'Faixa etária é obrigatória' }
	),
	gender: z.enum(
		Object.keys(personalOptions.gender) as [
			keyof typeof personalOptions.gender
		],
		{ message: 'Gênero é obrigatório' }
	),

	education: z.enum(
		Object.keys(improvementOptions.education) as [
			keyof typeof improvementOptions.education
		],
		{ message: 'Escolaridade é obrigatória' }
	),
	estimated_income: z.enum(
		Object.keys(improvementOptions.estimated_income) as [
			keyof typeof improvementOptions.estimated_income
		],
		{ message: 'Renda estimada é obrigatória' }
	),
});

export const profileStepSelectOptions = {
	localization: {
		country: objectToSelectOptions(localizationOptions.country),
		state: objectToSelectOptions(localizationOptions.state),
		city: objectToSelectOptions(localizationOptions.city),
	},
	personal: {
		age_group: objectToSelectOptions(personalOptions.age_group),
		gender: objectToSelectOptions(personalOptions.gender),
	},
	improvement: {
		education: objectToSelectOptions(improvementOptions.education),
		estimated_income: objectToSelectOptions(
			improvementOptions.estimated_income
		),
	},
};

export type ProfileStepType = z.infer<typeof profileStepSchema>;
