import { PropsWithChildren } from 'react';

type InformationBoxProps = {
	title: string;
	isHighlighted?: boolean;
	className?: string;
} & PropsWithChildren;

export function InformationBox({
	title,
	children,
	isHighlighted = false,
	className,
}: InformationBoxProps) {
	return (
		<div
			id="box-container"
			className={`flex-1 bg-card rounded-xl overflow-hidden shadow-md ${
				isHighlighted && 'order-first'
			}  ${!isHighlighted && ''} ${className}`}
		>
			<div
				id="box-title"
				className={`p-4 text-xl ${
					isHighlighted ? 'bg-chart-5/70' : 'bg-chart-2/80'
				}`}
			>
				{title}
			</div>
			<div
				id="box-content"
				className={`p-4 flex text-xl ${isHighlighted && 'text-4xl!'} `}
			>
				{children}
			</div>
		</div>
	);
}
