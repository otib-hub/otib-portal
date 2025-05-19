import { objectToSelectOptions } from '@/utils/object-to-select-options';
import { z } from 'zod';

const tripReasonsOptions = {
	'0': 'Lazer',
	'1': 'Negócios',
	'2': 'Visita a familiares',
	'3': 'Eventos',
	'4': 'Outros',
} as const;

const tripVehiclesOptions = {
	'0': 'Carro',
	'1': 'Ônibus',
	'2': 'Moto',
	'3': 'Outro',
} as const;

const tripStayTimeOptions = {
	'0': 'Menos de uma semana',
	'1': '1 semana',
	'2': '2 semanas',
	'3': 'Entre 2 semanas e 1 mês',
	'4': 'Entre 1 e 2 meses',
	'5': 'Mais de 2 meses',
};

const tripHostingTypesOptions = {
	'0': 'Hotel',
	'1': 'Pousada',
	'2': 'Casa de familiares/amigos',
	'3': 'Aluguel por temporada',
	'4': 'Outro',
} as const;

const tripDiaryExpenseOptions = {
	'0': 'Até R$ 50',
	'1': 'R$ 50 a R$ 200',
	'2': 'R$ 200 a R$ 500',
	'3': 'R$ 500 a R$ 1000',
	'4': 'R$ 1000 a R$ 3000',
	'5': 'Acima de R$ 3000',
};

export const tripStepSchema = z.object({
	trip_has_reincidence: z.boolean({ required_error: 'Campo obrigatório' }),
	trip_know_ibiapaba_mirantes: z.boolean({
		required_error: 'Campo obrigatório',
	}),

	trip_reasons: z
		.array(z.string(), {
			required_error: 'Motivo da viagem é obrigatório',
		})
		.min(1, 'Selecione pelo menos uma opção'),
	trip_vehicles: z
		.array(z.string(), {
			required_error: 'Veículo é obrigatório',
		})
		.min(1, 'Selecione pelo menos uma opção'),
	trip_stay_time: z.string({
		required_error: 'Tempo de estadia é obrigatório',
	}),

	trip_average_diary_expense: z.string({
		required_error: 'Gasto médio diário é obrigatório',
	}),
	trip_hosting_types: z
		.array(z.string(), {
			required_error: 'Tipo de hospedagem é obrigatório',
		})
		.min(1, 'Selecione pelo menos uma opção'),
});

export const tripStepSelectOptions = {
	trip_reasons: objectToSelectOptions(tripReasonsOptions),
	trip_vehicles: objectToSelectOptions(tripVehiclesOptions),
	trip_hosting_types: objectToSelectOptions(tripHostingTypesOptions),
	trip_stay_time: objectToSelectOptions(tripStayTimeOptions),
	trip_average_diary_expense: objectToSelectOptions(tripDiaryExpenseOptions),
};

export type TripStepType = z.infer<typeof tripStepSchema>;
