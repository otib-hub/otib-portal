import { BentoCard } from '../../_components/BentoCard';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { MailIcon } from 'lucide-react';
import { TFunction } from '@/@types/next-intl';

type ContactBentoGridProps = {
	t: TFunction;
};

export function ContactBentoGrid({ t }: ContactBentoGridProps) {
	return (
		<>
			<BentoCard
				className="w-full lg:w-fit"
				title={t(
					'app.partners.section#join-us.ContactBentoCards.0.title',
				)}
				description={t(
					'app.partners.section#join-us.ContactBentoCards.0.description',
				)}
				cta={
					<Link
						href={'mailto:nupreds@ifce.edu.br'}
						className={`${buttonVariants({
							variant: 'inline-link',
							className: '!text-base',
						})} `}
					>
						{'nupreds@ifce.edu.br'}
					</Link>
				}
			>
				<MailIcon className="size-6" />
			</BentoCard>
		</>
	);
}
