import { ReactNode } from 'react';

type CarouselSlidesIndicatorProps = {
	currentSlide: number;
	totalSlides: number;
	icon?: ReactNode;
	className?: string;
};

export function CarouselSlidesIndicator({
	currentSlide,
	totalSlides,
	icon,
	className,
}: CarouselSlidesIndicatorProps) {
	return (
		<span
			className={`absolute bottom-4 right-4 p-2 flex items-center justify-center gap-2 bg-background/70 backdrop-blur-sm rounded-2xl shadow-md text-sm text-foreground/70 hover:opacity-50 transition-opacity select-none ${className}`}
		>
			{icon}{' '}
			<span>
				{currentSlide} / {totalSlides}
			</span>
		</span>
	);
}
