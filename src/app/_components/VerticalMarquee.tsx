import { Marquee } from '@/components/fragments/Marquee';
import { citiesBackgrounds } from '@/utils/get-city-background';
import Image from 'next/image';

export function VerticalMarquee() {
	return (
		<div className="relative flex h-[300px] lg:h-[500px] w-full flex-row items-center justify-center overflow-hidden">
			<Marquee pauseOnHover vertical className="[--duration:20s]">
				<Image
					src={citiesBackgrounds.carnaubal.full}
					alt={'Carnaubal'}
					width={citiesBackgrounds.carnaubal.full.width}
					height={citiesBackgrounds.carnaubal.full.height}
					placeholder="blur"
					blurDataURL={citiesBackgrounds.carnaubal.full.blurDataURL}
					priority
					className="rounded-xl"
				/>
				<Image
					src={citiesBackgrounds.croata.full}
					alt={'Croatá'}
					width={citiesBackgrounds.croata.full.width}
					height={citiesBackgrounds.croata.full.height}
					placeholder="blur"
					blurDataURL={citiesBackgrounds.croata.full.blurDataURL}
					loading="lazy"
					className="rounded-xl"
				/>
				<Image
					src={citiesBackgrounds['guaraciaba-do-norte'].full}
					alt={'Guaraciaba do Norte'}
					width={citiesBackgrounds['guaraciaba-do-norte'].full.width}
					height={
						citiesBackgrounds['guaraciaba-do-norte'].full.height
					}
					placeholder="blur"
					blurDataURL={
						citiesBackgrounds['guaraciaba-do-norte'].full
							.blurDataURL
					}
					loading="lazy"
					className="rounded-xl"
				/>
				<Image
					src={citiesBackgrounds.ipu.full}
					alt={'Ipu'}
					width={citiesBackgrounds.ipu.full.width}
					height={citiesBackgrounds.ipu.full.height}
					placeholder="blur"
					blurDataURL={citiesBackgrounds.ipu.full.blurDataURL}
					loading="lazy"
					className="rounded-xl"
				/>
			</Marquee>

			<Marquee reverse pauseOnHover vertical className="[--duration:20s]">
				<Image
					src={citiesBackgrounds['sao-benedito'].full}
					alt="São Benedito"
					width={citiesBackgrounds['sao-benedito'].full.width}
					height={citiesBackgrounds['sao-benedito'].full.height}
					placeholder="blur"
					blurDataURL={
						citiesBackgrounds['sao-benedito'].full.blurDataURL
					}
					priority
					className="rounded-xl"
				/>
				<Image
					src={citiesBackgrounds.ubajara.full}
					alt="Ubajara"
					width={citiesBackgrounds.ubajara.full.width}
					height={citiesBackgrounds.ubajara.full.height}
					placeholder="blur"
					blurDataURL={citiesBackgrounds.ubajara.full.blurDataURL}
					loading="lazy"
					className="rounded-xl"
				/>
				<Image
					src={citiesBackgrounds['vicosa-do-ceara'].full}
					alt="Viçosa do Ceará"
					width={citiesBackgrounds['vicosa-do-ceara'].full.width}
					height={citiesBackgrounds['vicosa-do-ceara'].full.height}
					placeholder="blur"
					blurDataURL={
						citiesBackgrounds['vicosa-do-ceara'].full.blurDataURL
					}
					loading="lazy"
					className="rounded-xl"
				/>
			</Marquee>

			<div className="pointer-events-none absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-background"></div>
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-background"></div>
		</div>
	);
}
