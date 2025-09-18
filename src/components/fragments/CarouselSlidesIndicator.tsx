import { ReactNode } from 'react';

type CarouselSlidesIndicatorProps = {
	currentSlide: number;
	totalSlides: number;
	icon?: ReactNode;
};

export function CarouselSlidesIndicator({
	currentSlide,
	totalSlides,
	icon,
}: CarouselSlidesIndicatorProps) {
	return (
		<span className="absolute bottom-4 left-4 p-2 flex items-center justify-center gap-2 bg-card/50 backdrop-blur-sm rounded-2xl shadow-md text-sm text-foreground/70 hover:opacity-50 transition-opacity">
			{icon}{' '}
			<span>
				{currentSlide} / {totalSlides}
			</span>
		</span>
	);
}
