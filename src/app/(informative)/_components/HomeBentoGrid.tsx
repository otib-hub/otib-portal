import { TFunction } from '@/@types/next-intl';
import { BentoCard } from './BentoCard';
import { BoxIcon, ClipboardPenLineIcon, MapIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

type BentoGridProps = {
	t: TFunction<'app.Home'>;
};

export async function HomeBentoGrid({ t }: BentoGridProps) {
	return (
		<>
			<BentoCard
				className="flex-1 basis-1/2"
				title={t('sections.bento-cards.form-card.title')}
				description={t('sections.bento-cards.form-card.description')}
				cta={
					<Link
						href={
							'/researches/tourist-individual?referrer=portal-home'
						}
						className={`${buttonVariants({
							className: 'w-fit mt-3',
						})} `}
					>
						{t('sections.bento-cards.form-card.button_action')}
					</Link>
				}
			>
				<ClipboardPenLineIcon className="size-6" />
			</BentoCard>

			<BentoCard
				className="flex-1 basis-1/3"
				title={t('sections.bento-cards.productions-card.title')}
				description={t(
					'sections.bento-cards.productions-card.description',
				)}
				cta={
					<Link
						href={'/productions'}
						className={`${buttonVariants({
							className: 'w-fit mt-3',
						})} `}
					>
						{t(
							'sections.bento-cards.productions-card.button_action',
						)}
					</Link>
				}
			>
				<BoxIcon className="size-6" />
			</BentoCard>

			<BentoCard
				className="flex-1 basis-1/3"
				title={t('sections.bento-cards.tourism-map-card.title')}
				description={t(
					'sections.bento-cards.tourism-map-card.description',
				)}
				cta={
					<Link
						href={'/tourism-map'}
						className={`${buttonVariants({
							className: 'w-fit mt-3',
						})} `}
					>
						{t(
							'sections.bento-cards.tourism-map-card.button_action',
						)}
					</Link>
				}
			>
				<MapIcon className="size-6" />
			</BentoCard>
		</>
	);
}
