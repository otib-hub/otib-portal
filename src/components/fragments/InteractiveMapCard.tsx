import { getCityBackground } from '@/utils/get-city-background';
import { useIsMobile } from '@/hooks/layout/use-mobile';
import { convertToSlug } from '@/utils/convert-to-slug';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import { Spinner } from '../ui/spinner';
import dynamic from 'next/dynamic';

const LazyIbiapabaMap = dynamic(
	() => import('@/components/layout/IbiapabaMap'),
	{
		ssr: false,
		loading: () => (
			<Skeleton className="w-full min-h-[420px] md:min-h-[524px] rounded-2xl flex items-center justify-center">
				<Spinner />
			</Skeleton>
		),
	},
);

type InteractiveMapCardProps = {
	selectedCity: string | undefined;
	setSelectedCity: Dispatch<SetStateAction<string | undefined>>;
};

export function InteractiveMapCard({
	selectedCity,
	setSelectedCity,
}: InteractiveMapCardProps) {
	const isMobile = useIsMobile();

	const handleCityChange = useCallback(
		(city: string | undefined) => {
			if (city) {
				const formatted = convertToSlug(city.toLowerCase());
				setSelectedCity(formatted);
			} else {
				setSelectedCity(undefined);
			}
		},
		[setSelectedCity],
	);

	const bgImg = useMemo(
		() => getCityBackground(isMobile, selectedCity),
		[isMobile, selectedCity],
	);

	const imageKey = useMemo(
		() => `img-${selectedCity ?? 'default'}`,
		[selectedCity],
	);

	const optimizedAnimations = {
		content: {
			initial: { opacity: 0, y: 20 },
			animate: { opacity: 1, y: 0 },
			transition: {
				duration: 0.4,
				ease: [0.4, 0, 0.2, 1] as const,
			},
		},
		image: {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: {
				duration: 0.4,
				ease: [0.25, 0.46, 0.45, 0.94] as const, // easeInOut cubic-bezier
			},
			exitTransition: {
				duration: 0.2,
				ease: [0.25, 0.46, 0.45, 0.94] as const, // easeInOut cubic-bezier
			},
		},
	};

	return (
		<div
			id="map-container"
			className="relative w-full min-h-[420px] md:min-h-[524px] flex flex-col"
		>
			{/* Background image com AnimatePresence otimizada */}
			<AnimatePresence mode="wait">
				<motion.div
					key={imageKey}
					initial={optimizedAnimations.image.initial}
					animate={optimizedAnimations.image.animate}
					exit={optimizedAnimations.image.exit}
					transition={optimizedAnimations.image.transition}
					className="absolute inset-0 z-0 rounded-2xl overflow-hidden"
				>
					<Image
						src={bgImg}
						alt={`${selectedCity ?? 'default'} background`}
						fill
						priority={!selectedCity}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
						quality={80}
						className="object-cover object-center"
						placeholder="blur"
						blurDataURL={bgImg.blurDataURL}
					/>
				</motion.div>
			</AnimatePresence>

			{/* Container do mapa */}
			<div
				id="map-content"
				className="flex items-center justify-center relative z-10"
			>
				<LazyIbiapabaMap
					selected={selectedCity}
					onChangeSelected={handleCityChange}
				/>
			</div>
		</div>
	);
}
