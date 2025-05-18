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

const tripHostingTypesOptions = {
	'0': 'Hotel',
	'1': 'Pousada',
	'2': 'Casa de familiares/amigos',
	'3': 'Aluguel por temporada',
	'4': 'Outro',
} as const;

export const tripStepSchema = z.object({
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
	trip_hosting_types: z
		.array(z.string(), {
			required_error: 'Tipo de hospedagem é obrigatório',
		})
		.min(1, 'Selecione pelo menos uma opção'),
	trip_average_diary_expense: z
		.number()
		.min(50, {
			message: 'Selecione no mínimo 50 reais',
		})
		.max(8000, {
			message: 'Selecione no máximo 8000 reais para mais',
		}),
	trip_know_mirantes_ibiapaba: z.boolean({
		required_error: 'Campo obrigatório',
	}),
});

export const tripStepSelectOptions = {
	trip_reasons: objectToSelectOptions(tripReasonsOptions),
	trip_vehicles: objectToSelectOptions(tripVehiclesOptions),
	trip_hosting_types: objectToSelectOptions(tripHostingTypesOptions),
};

export type TripStepType = z.infer<typeof tripStepSchema>;
