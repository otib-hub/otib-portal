import { TFunction } from "@/@types/next-intl";
import { BentoCard } from "./BentoCard";
import { ClipboardPenLineIcon, NewspaperIcon } from "lucide-react";

type BentoGridProps = {
	t: TFunction<"app.Home">;
};

export async function HomeBentoGrid({ t }: BentoGridProps) {
	return (
		<>
			<BentoCard
				title={t("sections.bento-cards.form-card.title")}
				description={t("sections.bento-cards.form-card.description")}
				cta={{
					label: t("sections.bento-cards.form-card.button_action"),
					href: "/researches/tourist-individual?referrer=portal-home",
				}}
			>
				<ClipboardPenLineIcon className="size-10" />
			</BentoCard>

			<BentoCard
				title={t("sections.bento-cards.bulletins-card.title")}
				description={t("sections.bento-cards.bulletins-card.description")}
				cta={{
					href: 'https://nupreds.ifce.edu.br/otib-boletins/boletim01-2025.pdf',
					label: t("sections.bento-cards.bulletins-card.button_action")
				}}>
				<NewspaperIcon className="size-10" />
			</BentoCard>
		</>
	);
};