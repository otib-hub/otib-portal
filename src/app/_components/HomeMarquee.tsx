import { CityImage } from '@/@types/city-image';
import { Marquee } from '@/components/fragments/Marquee';
import { CitiesENUM, getCityImage } from '@/utils/get-city-image';
import Image from 'next/image';

const IMAGE_HEIGHT = 240;
const IMAGE_WIDTH = 300;

const images: CityImage[] = [
	{ ...getCityImage(true, CitiesENUM.CARNAUBAL, { priority: true }) },
	{ ...getCityImage(true, CitiesENUM.UBAJARA, { priority: true }) },
	{ ...getCityImage(true, CitiesENUM.TIANGUA, { priority: true }) },
	{ ...getCityImage(true, CitiesENUM.VICOSA, { priority: true }) },
	{ ...getCityImage(true, CitiesENUM.GBA, { loading: 'lazy' }) },
	{ ...getCityImage(true, CitiesENUM.CROATA, { loading: 'lazy' }) },
	{ ...getCityImage(true, CitiesENUM.IPU, { loading: 'lazy' }) },
	{ ...getCityImage(true, CitiesENUM.SB, { loading: 'lazy' }) },
	{ ...getCityImage(true, CitiesENUM.IBIAPINA, { loading: 'lazy' }) },
];

export function HomeMarquee() {
	return (
		<div className="relative flex flex-col w-full items-center justify-center overflow-hidden">
			<Marquee pauseOnHover className="[--duration:40s]">
				{images.map((img) => {
					return (
						<Image
							key={img.slug}
							className="rounded-xl object-cover"
							src={img.src}
							height={IMAGE_HEIGHT}
							width={IMAGE_WIDTH}
							placeholder="blur"
							blurDataURL={img.blurDataURL}
							priority={img.priority}
							loading={
								img.loading as 'eager' | 'lazy' | undefined
							}
							alt={img.title}
							title={img.alt}
						/>
					);
				})}
			</Marquee>

			<div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/6 bg-gradient-to-r from-background"></div>
			<div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/6 bg-gradient-to-l from-background"></div>
		</div>
	);
}
