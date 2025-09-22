import { JSX } from 'react';

type PartnerLink = {
	id: number;
	title: string;
	url: string;
	icon: JSX.Element;
};

type PartnerLogo = {
	readonly slug: string;
	readonly image: StaticImageData;
	readonly description: string;
};

export type Partner = {
	id: number;
	name: string;
	full_name: string;
	description?: string;
	logo?: PartnerLogo;
	since: string | Date;
	links: PartnerLink[];
};
