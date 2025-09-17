import { Partner } from '@/@types/partner';
import { buttonVariants } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { BadgeQuestionMarkIcon } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';
import Image from 'next/image';

type PartnerCardProps = {
	partner: Partner;
};

export function PartnerCard({ partner }: PartnerCardProps) {
	return (
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
							blurDataURL={partner.logo.image.blurDataURL}
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
					{partner.full_name}
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
					{typeof partner.since === 'string'
						? partner.since
						: new Date(partner.since).toLocaleString('pt-BR', {
								dateStyle: 'short',
						  })}
				</span>
			</CardFooter>
		</Card>
	);
}
