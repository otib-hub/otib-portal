import { ReactNode } from 'react';
import clsx from 'clsx';

type BentoCardProps = {
	title: string;
	description?: string;
	cta?: ReactNode;
	className?: string;
	children?: ReactNode;
};

export function BentoCard({
	title,
	description,
	cta,
	children,
	className,
}: BentoCardProps) {
	return (
		<div
			className={clsx(
				'bg-card outline-2 outline-muted rounded-xl shadow-lg p-6 flex justify-start',
				className,
			)}
		>
			<div className="bento-cards-content flex flex-col gap-4 items-start justify-between">
				{/* Background / children (imagem ou qualquer conteúdo extra) */}
				<div className="rounded-xl border-1 border-muted w-fit h-fit p-3">
					{children}
				</div>

				{/* Conteúdo textual */}
				<div className="bento-cards-heading flex flex-col gap-3">
					<span className="text-xl font-semibold">{title}</span>
					<p className="text-muted-foreground">{description}</p>
				</div>

				{cta}
			</div>
		</div>
	);
}
