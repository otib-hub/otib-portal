export type Country = {
	name: string;
	iso2: string;
	iso3: string;
	unicodeFlag: string;
};

export type State = {
	name: string;
	state_code: string;
};

export type City = {
	[key: string]: string;
};
