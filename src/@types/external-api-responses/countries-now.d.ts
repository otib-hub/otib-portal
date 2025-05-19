type CountriesNowResponse = {
	error: boolean;
	msg: string;
};

export interface State {
	name: string;
}

export interface CountryPosition {
	name: string;
	iso2: string;
	long: number;
	lat: number;
}

export type CountriesPositionReponse = CountriesNowResponse & {
	data: CountryPosition[];
};

export type CountryStatesResponse = {
	states: StateResponse[];
} & Omit<CountryPosition, ['long', 'lat']> &
	CountriesNowResponse;

export type CitiesInStateResponse = {
	data: string[];
} & CountriesNowResponse;

export interface CitiesInStateRequest {
	country: string;
	state: string;
}
