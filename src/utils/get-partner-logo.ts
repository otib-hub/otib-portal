import fortib_logo from '#/images/partners/fortib-logo.png';
import ifce_tiangua_logo from '#/images/partners/ifce-tiangua-logo.png';
import sebrae_logo from '#/images/partners/sebrae-logo.png';
import nupreds_logo from '#/images/partners/nupreds-logo.png';

export enum PartnersEnum {
	IFCE_TIANGUA = 'ifce-tiangua',
	NUPREDS = 'nupreds',
	FORTIB = 'fortib',
	SEBRAE = 'sebrae',
}

export const partnersLogos = {
	fortib: {
		slug: 'fortib',
		image: fortib_logo,
		description: 'FORTIB logo',
	},
	['ifce-tiangua']: {
		slug: 'ifce-tiangua',
		image: ifce_tiangua_logo,
		description: 'IFCE Campus Tianguá logo',
	},
	sebrae: {
		slug: 'sebrae',
		image: sebrae_logo,
		description: 'SEBRAE logo',
	},
	nupreds: {
		slug: 'nupreds',
		image: nupreds_logo,
		description: 'NUPREDS logo',
	},
} as const;

export function getPartnerLogo(partnerName: PartnersEnum) {
	return partnersLogos[partnerName as keyof typeof partnersLogos];
}
