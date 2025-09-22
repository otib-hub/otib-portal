import { describe, it, expect } from 'vitest';
import {
	getPartnerLogo,
	partnersLogos,
	PartnersEnum,
} from '../get-partner-logo';

describe('getPartnerLogo() - unit tests', () => {
	it('should return the correct logo object for each valid PartnersEnum', () => {
		Object.values(PartnersEnum).forEach((partnerKey) => {
			const result = getPartnerLogo(partnerKey);
			const expected =
				partnersLogos[partnerKey as keyof typeof partnersLogos];
			expect(result).toEqual(expected);
		});
	});

	it('should have required properties in the returned logo object', () => {
		const result = getPartnerLogo(PartnersEnum.FORTIB);
		expect(result).toHaveProperty('slug', 'fortib');
		expect(result).toHaveProperty('image');
		expect(result).toHaveProperty('description', 'FORTIB logo');
	});
});
