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

export interface CountryStateData {
	name: string;
	states: State[];
}

export type CountriesPositionReponse = CountriesNowResponse & {
	data: CountryPosition[];
};

export type CountryStatesResponse = {
	data: CountryStateData;
} & CountriesNowResponse;

export type CitiesInStateResponse = {
	data: string[];
} & CountriesNowResponse;

export interface CitiesInStateRequest {
	country: string;
	state: string;
}
