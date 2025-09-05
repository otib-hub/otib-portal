import { Marquee } from '@/components/fragments/Marquee';
import { citiesBackgrounds } from '@/utils/get-city-background';
import Image from 'next/image';

export function VerticalMarquee() {
	return (
		<div className="relative flex h-[300px] lg:h-[500px] w-full rounded-4xl flex-row items-center justify-center overflow-hidden">
			<Marquee pauseOnHover vertical className="[--duration:20s]">
				<Image
					src={citiesBackgrounds.carnaubal.full}
					alt={'Carnaubal'}
					className="rounded-xl"
				/>
				<Image
					src={citiesBackgrounds.croata.full}
					alt={'Croatá'}
					className="rounded-xl"
				/>
				<Image
					src={citiesBackgrounds['guaraciaba-do-norte'].full}
					alt={'Guaraciaba do Norte'}
					className="rounded-xl"
				/>
				<Image
					src={citiesBackgrounds.ipu.full}
					alt={'Ipu'}
					className="rounded-xl"
				/>
			</Marquee>

			<Marquee reverse pauseOnHover vertical className="[--duration:20s]">
				<Image
					src={citiesBackgrounds['sao-benedito'].full}
					alt="São Benedito"
					className="rounded-xl"
				/>
				<Image
					src={citiesBackgrounds.ubajara.full}
					alt="Ubajara"
					className="rounded-xl"
				/>
				<Image
					src={citiesBackgrounds['vicosa-do-ceara'].full}
					alt="Viçosa do Ceará"
					className="rounded-xl"
				/>
			</Marquee>
		</div>
	);
}
