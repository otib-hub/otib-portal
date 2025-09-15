import { Marquee } from '@/components/fragments/Marquee';
import { citiesBackgrounds } from '@/utils/get-city-background';
import Image from 'next/image';

const IMAGE_HEIGHT = 240;
const IMAGE_WIDTH = 300;

const images = [
	{
		src: citiesBackgrounds.gba.square,
		title: citiesBackgrounds.gba.description,
		alt: citiesBackgrounds.gba.description,
		blurDataURL: citiesBackgrounds.gba.square.blurDataURL,
		loading: 'lazy',
		slug: citiesBackgrounds.gba.slug,
	},
	{
		src: citiesBackgrounds.carnaubal.square,
		title: citiesBackgrounds.carnaubal.description,
		alt: citiesBackgrounds.carnaubal.description,
		blurDataURL: citiesBackgrounds.carnaubal.square.blurDataURL,
		priority: true,
		slug: citiesBackgrounds.carnaubal.slug,
	},
	{
		src: citiesBackgrounds.ubajara.square,
		title: citiesBackgrounds.ubajara.description,
		alt: citiesBackgrounds.ubajara.description,
		blurDataURL: citiesBackgrounds.ubajara.square.blurDataURL,
		loading: 'lazy',
		slug: citiesBackgrounds.ubajara.slug,
	},
	{
		src: citiesBackgrounds.tiangua.square,
		title: citiesBackgrounds.tiangua.description,
		alt: citiesBackgrounds.tiangua.description,
		blurDataURL: citiesBackgrounds.tiangua.square.blurDataURL,
		loading: 'lazy',
		slug: citiesBackgrounds.tiangua.slug,
	},
	{
		src: citiesBackgrounds.vicosa.square,
		title: citiesBackgrounds.vicosa.description,
		alt: citiesBackgrounds.vicosa.description,
		blurDataURL: citiesBackgrounds.vicosa.square.blurDataURL,
		loading: 'lazy',
		slug: citiesBackgrounds.vicosa.slug,
	},
	{
		src: citiesBackgrounds.croata.square,
		title: citiesBackgrounds.croata.description,
		alt: citiesBackgrounds.croata.description,
		blurDataURL: citiesBackgrounds.croata.square.blurDataURL,
		loading: 'lazy',
		slug: citiesBackgrounds.croata.slug,
	},
	{
		src: citiesBackgrounds.ipu.square,
		title: citiesBackgrounds.ipu.description,
		alt: citiesBackgrounds.ipu.description,
		blurDataURL: citiesBackgrounds.ipu.square.blurDataURL,
		loading: 'lazy',
		slug: citiesBackgrounds.ipu.slug,
	},
	{
		src: citiesBackgrounds.sb.square,
		title: citiesBackgrounds.sb.description,
		alt: citiesBackgrounds.sb.description,
		blurDataURL: citiesBackgrounds.sb.square.blurDataURL,
		priority: true,
		slug: citiesBackgrounds.sb.slug,
	},
	{
		src: citiesBackgrounds.ibiapina.square,
		title: citiesBackgrounds.ibiapina.description,
		alt: citiesBackgrounds.ibiapina.description,
		blurDataURL: citiesBackgrounds.ibiapina.square.blurDataURL,
		priority: true,
		slug: citiesBackgrounds.ibiapina.slug,
	},
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
