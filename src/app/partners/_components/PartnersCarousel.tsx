import { buttonVariants } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { BadgeQuestionMarkIcon, EarthIcon, InstagramIcon } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';
import { Partner } from '../../../@types/partner';
import { getPartnerLogo, PartnersEnum } from '@/utils/get-partner-logo';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function PartnersCarousel() {
	const t = useTranslations('app.partners.section#partners-carousel');
	const partners: Partner[] = [
		{
			id: 0,
			name: 'IFCE - Campus Tianguá',
			full_name: t('partners.0.name'),
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
			full_name: t('partners.1.name'),
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
			full_name: t('partners.2.name'),
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
			],
		},
		{
			id: 3,
			name: 'FORTIB',
			full_name: t('partners.3.name'),
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
						<Card className="h-full justify-between gap-6">
							<CardContent className="h-fit">
								{partner.logo ? (
									<div className="flex items-center justify-start">
										<Image
											className="rounded-md w-full max-w-72"
											src={partner.logo.image.src}
											height={96}
											quality={100}
											placeholder="blur"
											blurDataURL={
												partner.logo.image.blurDataURL
											}
											width={Math.round(
												(partner.logo.image.width /
													partner.logo.image.height) *
													96,
											)}
											alt={partner.logo.description}
										/>
									</div>
								) : (
									<div className="text-muted-foreground">
										<BadgeQuestionMarkIcon className="size-16" />
									</div>
								)}
							</CardContent>

							<CardHeader>
								<CardTitle className="leading-normal">
									{partner.name}
								</CardTitle>
								<CardDescription className="text-base">
									{partner.description}
								</CardDescription>
							</CardHeader>

							<CardFooter className="flex flex-col gap-2 items-start justify-start">
								<div className="flex gap-3 flex-wrap items-center">
									{partner.links.map((link) => {
										return (
											<Fragment key={link.id}>
												<Link
													title={`${partner.name}: ${link.title}`}
													className={buttonVariants({
														variant: 'inline-link',
														className:
															'md:text-base! hover:opacity-70 transition-opacity',
													})}
													href={link.url}
													target="_blank"
													rel="noopener"
												>
													{link.icon}
												</Link>
											</Fragment>
										);
									})}
								</div>

								<span className="text-base">
									{`${t('partner-since')} `}
									{typeof partner.since === 'string'
										? partner.since
										: new Date(
												partner.since,
										  ).toLocaleString('pt-BR', {
												dateStyle: 'short',
										  })}
								</span>
							</CardFooter>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
