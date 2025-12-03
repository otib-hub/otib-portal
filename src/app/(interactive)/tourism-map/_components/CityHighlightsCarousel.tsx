import { CityTouristicData } from '@/@types/city-touristic-data';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from '@/components/ui/carousel';
import { ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { memo, useState } from 'react';
import { CarouselSlidesIndicator } from '../../../../components/fragments/CarouselSlidesIndicator';

type CityHighlightsCarouselProps = {
	data: CityTouristicData;
	selectedCity?: string;
};

export const cityNameMap = {
	'vicosa-do-ceara': 'Viçosa do Ceará',
	tiangua: 'Tianguá',
	ubajara: 'Ubajara',
	ibiapina: 'Ibiapina',
	'sao-benedito': 'São Benedito',
	carnaubal: 'Carnaubal',
	'guaraciaba-do-norte': 'Guaraciaba do Norte',
	croata: 'Croatá',
	ipu: 'Ipu',
} as const;

const CityHighlightsCarousel = memo(function CityHighlightsCarousel({
	data,
	selectedCity,
}: CityHighlightsCarouselProps) {
	const t = useTranslations('app.tourism-map.cities-description');
	const [currentSlide, setCurrentSlide] = useState<number>(1);
	return (
		<div className="max-w-184 flex flex-col gap-4 flex-1 rounded-xl bg-background text-muted-foreground">
			<Carousel
				setApi={(api) => {
					// funções disparadas em eventos do carrossel para alterar o valor de currentSlide
					if (!api) return;
					api.on('select', () => {
						setCurrentSlide(api.selectedScrollSnap() + 1);
					});
					api.on('reInit', () => {
						setCurrentSlide(api.selectedScrollSnap() + 1);
					});
				}}
				className="w-full"
			>
				<CarouselContent>
					{data.images.map((image) => {
						return (
							<CarouselItem key={image.slug}>
								<Image
									className="max-h-128 lg:max-h-100 object-cover rounded-xl"
									src={image.src}
									height={image.height}
									width={image.width}
									placeholder="empty"
									priority={image.priority}
									loading={
										image.loading as
											| 'eager'
											| 'lazy'
											| undefined
									}
									alt={image.title}
									title={image.alt}
								/>
							</CarouselItem>
						);
					})}
				</CarouselContent>

				<CarouselPrevious variant="secondary" className="left-4 z-10" />
				<CarouselNext variant="secondary" className="right-4 z-10" />

				<span className="absolute top-4 left-4 p-2 flex items-center justify-center gap-2 bg-background/70 backdrop-blur-sm rounded-2xl shadow-xl text-base md:text-xl font-bold text-foreground/70 hover:opacity-50 transition-opacity select-none">
					{selectedCity
						? cityNameMap[selectedCity as keyof typeof cityNameMap]
						: 'Serra da Ibiapaba'}
				</span>

				<CarouselSlidesIndicator
					currentSlide={currentSlide}
					totalSlides={data.images.length}
					icon={<ImageIcon className="size-5" />}
				/>
			</Carousel>

			<p>{t(`${selectedCity ?? 'default'}`)}</p>
		</div>
	);
});

export default CityHighlightsCarousel;
