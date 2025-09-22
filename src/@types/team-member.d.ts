import { ReactNode } from 'react';

type TeamMember = {
	id: number;
	name: string;
	role?: string;
	profilePhotoSrc?: string;
	links: LinkType[] & { icon?: ReactNode };
};
