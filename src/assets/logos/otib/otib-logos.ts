import icon_dark from '#/logos/otib/icon/icon-dark.svg';
import icon_light from '#/logos/otib/icon/icon-light.svg';
import horizontal_dark from '#/logos/otib/horizontal/horizontal-dark.svg';
import horizontal_light from '#/logos/otib/horizontal/horizontal-light.svg';

export type OtibLogoVariants = 'icon' | 'horizontal';

type OtibLogoType = {
	width: number;
	height: number;
	src: { light: string; dark: string };
};

export const OtibLogos: Record<OtibLogoVariants, OtibLogoType> = {
	icon: {
		width: 163,
		height: 150,
		src: {
			light: icon_light,
			dark: icon_dark,
		},
	},
	horizontal: {
		width: 209,
		height: 32,
		src: {
			light: horizontal_light,
			dark: horizontal_dark,
		},
	},
};
