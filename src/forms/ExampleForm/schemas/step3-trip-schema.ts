import { objectToSelectOptions } from '@/utils/object-to-select-options';
import { z } from 'zod';

const tripReasonsOptions = {
	'0': 'Lazer, Passeios/Descanso', //  (aqui seria interessante abrir para perguntar a principal motivação (aventura, atrativos naturais, cultura, gastronomia, religião, rural, eventos..)
	'1': 'Negócios/Trabalho',
	'2': 'Visita a Parentes/Amigos',
	'3': 'Educação, Cursos, Qualificação',
	'4': 'Esportes',
	'5': 'Compras',
	'6': 'Serviços médicos',
	'7': 'Religioso',
	'8': 'Outros',
} as const;

const tripVehiclesOptions = {
	'0': 'Carro próprio',
	'1': 'Ônibus',
	'2': 'Moto',
	'3': 'Bicicleta',
	'4': 'Van',
	'5': 'Transporte por aplicativo (Ubis, Mototáxi Tianguá, etc.)',
	'6': 'Táxi',
	'7': 'Motorhome/Trailer',
	'8': 'Avião',
	'9': 'Outro',
} as const;

const tripStayTimeOptions = {
	'0': '1 dia',
	'1': '2 a 3 dias',
	'2': 'Apenas no final de semana',
	'3': '4 dias',
	'4': '5 dias',
	'5': '1 semana',
	'6': '15 dias',
	'7': 'Mais de 15 dias',
} as const;

const tripReincidenceOptions = {
	'0': 'Já visitei entre 2 e 5 vezes',
	'1': 'Já visitei entre 5 e 10 vezes',
	'2': 'Já visitei mais de 10 vezes',
	'3': 'Visito uma vez por mês',
	'4': 'Visito a cada fim de semana',
} as const;

const tripHowKnowMirantes = {
	'0': 'Rádio',
	'1': 'TV',
	'2': 'Revistas e jornais',
	'3': 'Agências de viagens',
	'4': 'Google e buscadores em geral',
	'5': 'Redes sociais (Facebook, Instagram, outros)',
	'6': 'Site Experiências Ibiapaba',
	'7': 'Site dos municípios',
	'8': 'Sites de reserva online (OTA, como Booking, decolar)',
	'9': 'Sites especializados em turismo',
	'10': 'Blogs de viagens',
	'11': 'Outros',
} as const;

const tripHostingTypesOptions = {
	'0': 'Hotel',
	'1': 'Pousada',
	'2': 'Casa de familiares/amigos',
	'3': 'Aluguel por temporada',
	'4': 'Camping',
	'5': 'Hostel',
	'6': 'Resort',
	'7': 'Chalé',
	'8': 'Motorhome/Trailer',
	'9': 'Outro',
} as const;

const tripDiaryExpenseOptions = {
	'0': 'Até R$ 300,00',
	'1': 'De R$ 300,00 a R$ 500,00',
	'2': 'De R$ 500,00 a R$ 1.000,00',
	'3': 'De R$ 1.000,00 a R$ 1.500,00',
	'4': 'De R$ 1.500,00 a R$ 2.000,00',
	'5': 'De R$ 2.000,00 a R$ 3.000,00',
	'6': 'De R$ 3.000,00 a R$ 5.000,00',
	'7': 'Acima de R$ 5.000,00',
} as const;

export const tripStepSchema = z.object({
	trip_has_reincidence: z.boolean({ required_error: 'Campo obrigatório' }),
	trip_reincidence: z.string().optional(),
	trip_know_ibiapaba_mirantes: z.boolean({
		required_error: 'Campo obrigatório',
	}),
	trip_how_know_ibiapaba_mirantes: z
		.array(z.string(), {
			required_error: 'Selecione pelo menos 1 opção',
		})
		.optional(),
	/*
		Para quem responder SIM, abrir nova pergunta com: Como ficou sabendo:
		Opções de resposta:
			a) Rádio
			b) TV
			c) Revistas e jornais
			d) Agências de viagens
			e) Google e buscadores em geral
			f) Redes sociais (Facebook, Instagram, outros)
			g) Site Experiências Ibiapaba
			h) Site dos municípios
			i) Sites de reserva online (OTA, como Booking, decolar)
			j) Sites especializados em turismo
			k) Blogs de viagens
			l) Outros. Especificar
	*/ trip_reasons: z
		.array(z.string(), {
			required_error: 'Selecione pelo menos 1 opção',
		})
		.min(1, { message: 'Selecione pelo menos 1 opção' }),
	trip_vehicles: z
		.array(z.string(), {
			required_error: 'Selecione pelo menos 1 opção',
		})
		.min(1, { message: 'Selecione pelo menos 1 opção' }),
	trip_stay_time: z.string({
		required_error: 'Campo obrigatório',
	}),

	trip_average_diary_expense: z.string({
		required_error: 'Campo obrigatório',
	}),
	trip_hosting_types: z
		.array(z.string(), {
			required_error: 'Selecione pelo menos 1 opção',
		})
		.min(1, { message: 'Selecione pelo menos 1 opção' }),
});

export const tripStepSelectOptions = {
	trip_reasons: objectToSelectOptions(tripReasonsOptions),
	trip_reincidence: objectToSelectOptions(tripReincidenceOptions),
	trip_how_know_ibiapaba_mirantes: objectToSelectOptions(tripHowKnowMirantes),
	trip_vehicles: objectToSelectOptions(tripVehiclesOptions),
	trip_hosting_types: objectToSelectOptions(tripHostingTypesOptions),
	trip_stay_time: objectToSelectOptions(tripStayTimeOptions),
	trip_average_diary_expense: objectToSelectOptions(tripDiaryExpenseOptions),
};

export type TripStepType = z.infer<typeof tripStepSchema>;
