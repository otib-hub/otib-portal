import { TouristIndividualResearchFormType } from './schemas/form-schema';

export const TOURIST_INDIVIDUAL_RESPONSE_MOCK: Partial<TouristIndividualResearchFormType> =
	{
		// Profile Step
		tourist_age_group: '2', // 25-34 years
		tourist_gender: 'male',
		tourist_education: '5', // Graduação
		tourist_estimated_income: 'mid',

		// Planning Step
		planning_was_planned: true,
		planning_time: '2', // 1-3 meses
		planning_information_sources: ['1', '3', '4'], // Internet, Amigos, Redes Sociais
		planning_organization: '1', // Sozinho

		// Trip Step
		trip_has_reincidence: true,
		trip_reincidence: '2', // 2-3 vezes
		trip_know_ibiapaba_mirantes: true,
		trip_how_know_ibiapaba_mirantes: ['1', '2'], // Internet, Amigos
		trip_reasons: ['1', '3'], // Turismo, Natureza
		trip_vehicles: ['1'], // Carro próprio
		trip_stay_time: '2', // 2-3 dias
		trip_average_diary_expense: '2', // R$ 100-200
		trip_hosting_types: ['1', '2'], // Hotel, Pousada

		// Activities Step
		activities_cities_visited: ['1', '2'], // São Benedito, Ubajara
		activities_attractions_visited: ['1', '2', '3'], // Mirantes, Cachoeiras, Trilhas
		activities_used_apps: ['1', '2'], // Google Maps, Instagram

		// Evaluation Step
		evaluation_recommendation_rate: 9,
		evaluation_dissatisfactions: ['1', '2'],
		evaluation_expectation_rate: 8,
		evaluation_satisfaction_rate: 9,
		evaluation_return_intent_rate: 10,
		evaluation_open_opinion:
			'Excelente experiência! Recomendo fortemente a visita.',
	};
