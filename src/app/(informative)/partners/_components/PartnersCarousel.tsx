import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { EarthIcon, InstagramIcon } from 'lucide-react';
import { Partner } from '../.././../../@types/partner';
import { getPartnerLogo, PartnersEnum } from '@/utils/get-partner-logo';
import { useTranslations } from 'next-intl';
import { PartnerCard } from './PartnerCard';

export function PartnersCarousel() {
	const t = useTranslations('app.partners.section#partners-carousel');
	const partners: Partner[] = [
		{
			id: 0,
			name: 'IFCE - Campus Tianguá',
			full_name: t('partners.0.full_name'),
			description: t('partners.0.description'),
			since: t('partners.0.since'),
			logo: getPartnerLogo(PartnersEnum.IFCE_TIANGUA),
			links: [
				{
					id: 0,
					title: 'Website',
					url: 'https://ifce.edu.br/tiangua',
					icon: <EarthIcon className="size-5" />,
				},
				{
					id: 1,
					title: 'Instagram',
					url: 'https://www.instagram.com/ifcetiangua/',
					icon: <InstagramIcon className="size-5" />,
				},
			],
		},
		{
			id: 1,
			name: 'NUPREDS',
			full_name: t('partners.1.full_name'),
			description: t('partners.1.description'),
			since: t('partners.1.since'),
			logo: getPartnerLogo(PartnersEnum.NUPREDS),
			links: [
				{
					id: 0,
					title: 'Website',
					url: 'https://nupreds.ifce.edu.br/',
					icon: <EarthIcon className="size-5" />,
				},
				{
					id: 1,
					title: 'Instagram',
					url: 'https://www.instagram.com/nupreds/',
					icon: <InstagramIcon className="size-5" />,
				},
			],
		},
		{
			id: 2,
			name: 'SEBRAE',
			full_name: t('partners.2.full_name'),
			description: t('partners.2.description'),
			since: t('partners.2.since'),
			logo: getPartnerLogo(PartnersEnum.SEBRAE),
			links: [
				{
					id: 0,
					title: 'Website',
					url: 'https://sebrae.com.br/sites/PortalSebrae/ufs/ce?codUf=6',
					icon: <EarthIcon className="size-5" />,
				},
				{
					id: 1,
					title: 'Instagram',
					url: 'https://www.instagram.com/sebraece/',
					icon: <InstagramIcon className="size-5" />,
				},
			],
		},
		{
			id: 3,
			name: 'FORTIB',
			full_name: t('partners.3.full_name'),
			description: t('partners.3.description'),
			since: t('partners.3.since'),
			logo: getPartnerLogo(PartnersEnum.FORTIB),
			links: [
				{
					id: 0,
					title: 'Instagram',
					url: 'https://www.instagram.com/fortiboficial/',
					icon: <InstagramIcon className="size-5" />,
				},
			],
		},
	];

	return (
		<Carousel>
			<CarouselContent>
				{partners.map((partner) => (
					<CarouselItem
						key={partner.id}
						className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
					>
						<PartnerCard partner={partner} t={t} />
					</CarouselItem>
				))}
			</CarouselContent>

			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
