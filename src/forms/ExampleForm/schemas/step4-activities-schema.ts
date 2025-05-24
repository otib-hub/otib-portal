import { objectToSelectOptions } from '@/utils/object-to-select-options';
import { z } from 'zod';

const placesVisitedOptions = {
	'0': 'Carnaubal',
	'1': 'Croatá',
	'2': 'Guaraciaba do Norte',
	'3': 'Ibiapina',
	'4': 'Ipu',
	'5': 'São Benedito',
	'6': 'Tianguá',
	'7': 'Ubajara',
	'8': 'Viçosa do Ceará',
} as const;

const eventsVisitedOption = {
	'0': 'Museus',
	'1': 'Espaços religiosos (igrejas, festejos)',
	'2': 'Atividades de aventura na natureza',
	'3': 'Parques temáticos',
} as const;

const usedAppsOption = {
	'0': 'Mapas ou navegadores: Waze, Google Maps, etc.',
	'1': 'Guias turísticos digitais',
	'2': 'Tradutores de idiomas',
	'3': 'Aplicativos de transporte: Uber, 99, etc.',
	'4': 'Redes sociais para compartilhar experiências',
	'5': 'Aplicativos de reserva de hospedagem: Booking, Airbnb, etc.',
	'6': 'Aplicativos de avaliação de restaurantes e atrações: TripAdvisor, Google Avaliações, etc.',
} as const;

export const activitiesStepSchema = z.object({
	activities_places_visited: z
		.array(z.string(), { required_error: 'Selecione pelo menos 3 destinos' })
		.min(3, { message: 'Selecione pelo menos 3 destinos' }),
	activities_events_visited: z.array(z.string()).optional(),
	activities_used_apps: z.array(z.string()).optional(),
});

export type ActivitiesStepType = z.infer<typeof activitiesStepSchema>;

export const activitiesStepSelectOptions = {
	activities_places_visited: objectToSelectOptions(placesVisitedOptions),
	activities_events_visited: objectToSelectOptions(eventsVisitedOption),
	activities_used_apps: objectToSelectOptions(usedAppsOption),
};
