import { TeamMember } from '@/@types/team-member';
import { GithubIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';

import duda_profile_photo from '#/images/team/duda.webp';
import dhiego_profile_photo from '#/images/team/dhiego.webp';

const coordinationTeam: TeamMember[] = [
	{
		id: 0,
		name: 'Nécio Veras',
		role: 'Coordination',
		profilePhotoSrc:
			'https://media.licdn.com/dms/image/v2/D4D03AQFvs38Svmtu9g/profile-displayphoto-shrink_800_800/B4DZcyy71nGUAk-/0/1748903903308?e=1761177600&v=beta&t=-_x7Yyz-WlrKWMiTw9xhUgyV7IoPdj534EPdcobdl6w',
		links: [
			{
				id: 0,
				title: 'LinkedIn',
				url: 'https://linkedin.com/in/necioveras',
				icon: <LinkedinIcon className="size-4" />,
			},
		],
	},
];

const developmentTeam: TeamMember[] = [
	{
		id: 0,
		name: 'Manuel Carlos',
		role: 'Frontend Developer',
		profilePhotoSrc:
			'https://avatars.githubusercontent.com/u/110443154?v=4',
		links: [
			{
				id: 0,
				title: 'LinkedIn',
				url: 'https://linkedin.com/in/1manuelc',
				icon: <LinkedinIcon className="size-4" />,
			},
			{
				id: 1,
				title: 'Github',
				url: 'https://github.com/1manuelc',
				icon: <GithubIcon className="size-4" />,
			},
			{
				id: 2,
				title: 'Instagram',
				url: 'https://instagram.com/1manuelc.dev',
				icon: <InstagramIcon className="size-4" />,
			},
		],
	},
	{
		id: 1,
		name: 'Murilo Rodrigues',
		role: 'Backend Developer',
		profilePhotoSrc:
			'https://media.licdn.com/dms/image/v2/D4D03AQEca5C5XmsVyQ/profile-displayphoto-shrink_400_400/B4DZRlZiRXHEAg-/0/1736867980852?e=1760572800&v=beta&t=UaRm2z16gLAR9anMl4UBmcrlSKpqZctnPvqoYsw_cQs',
		links: [
			{
				id: 0,
				title: 'LinkedIn',
				url: 'https://linkedin.com/in/murilo-rodrigues-dev',
				icon: <LinkedinIcon className="size-4" />,
			},
			{
				id: 1,
				title: 'Github',
				url: 'https://github.com/draminhon',
				icon: <GithubIcon className="size-4" />,
			},
		],
	},
];

const designTeam: TeamMember[] = [
	{
		id: 0,
		name: 'Eduarda Sales',
		profilePhotoSrc: duda_profile_photo.src,
		links: [
			{
				id: 0,
				title: 'LinkedIn',
				url: 'https://www.linkedin.com/in/eduarda-sales-4b5396282',
				icon: <LinkedinIcon className="size-4" />,
			},
			{
				id: 1,
				title: 'Github',
				url: 'https://github.com/adr0ude',
				icon: <GithubIcon className="size-4" />,
			},
		],
	},
	{
		id: 1,
		name: 'Dhiego Cavalcanti',
		profilePhotoSrc: dhiego_profile_photo.src,
		links: [
			{
				id: 0,
				title: 'LinkedIn',
				url: 'https://www.linkedin.com/in/dhiego-cavalcanti-da-silveira-14b301294',
				icon: <LinkedinIcon className="size-4" />,
			},
			{
				id: 1,
				title: 'Instagram',
				url: 'https://www.instagram.com/dhiego.com.h',
				icon: <InstagramIcon className="size-4" />,
			},
		],
	},
];

const computerVisionTeam: TeamMember[] = [
	{
		id: 0,
		name: 'Guilherme',
		links: [],
	},
];

export const team = {
	coordinationTeam,
	developmentTeam,
	designTeam,
	computerVisionTeam,
};
