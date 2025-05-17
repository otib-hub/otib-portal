import { z } from 'zod';

export function arrayToSelectOptions(options: ReadonlyArray<string>) {
	return options.map((option, idx) => ({ value: String(idx), label: option }));
}

const tripReasonsOptions = [
	'Lazer',
	'Negócios',
	'Visita a familiares',
	'Eventos',
	'Outros',
] as const;

const tripVehiclesOptions = ['Carro', 'Ônibus', 'Moto', 'Outro'] as const;

const tripHostingTypesOptions = [
	'Hotel',
	'Pousada',
	'Casa de familiares/amigos',
	'Aluguel por temporada',
	'Outro',
] as const;

export const tripStepSchema = z.object({
	trip_reasons: z.enum(tripReasonsOptions).array().min(1, {
		message: 'Selecione pelo menos um motivo da viagem',
	}),
	trip_vehicles: z.enum(tripVehiclesOptions).array().min(1, {
		message: 'Selecione pelo menos um motivo da viagem',
	}),
	trip_hosting_types: z.enum(tripHostingTypesOptions).array().min(1, {
		message: 'Selecione pelo menos um motivo da viagem',
	}),
});

export const tripStepSelectOptions = {
	trip_reasons: arrayToSelectOptions(tripReasonsOptions),
	trip_vehicles: arrayToSelectOptions(tripVehiclesOptions),
	trip_hosting_types: arrayToSelectOptions(tripHostingTypesOptions),
};

export type TripStepType = z.infer<typeof tripStepSchema>;
