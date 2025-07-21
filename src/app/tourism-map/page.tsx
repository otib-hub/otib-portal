'use client';
import { getBgForMunicipality } from '@/assets/images/municipalities/municipalities-backgrounds';
import { Spinner } from '@/components/ui/spinner';
import { useIsMobile } from '@/hooks/layout/use-mobile';
import { convertToSlug } from '@/utils/convert-to-slug';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Heading } from '@/components/ui/heading';
import { Footer } from '@/components/layout/Footer';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const LazyIbiapabaMap = dynamic(
	() => import('@/components/layout/IbiapabaMap'),
	{
		ssr: false,
		loading: () => (
			<Skeleton className='w-full min-h-[480px] md:min-h-[564px] rounded-2xl flex items-center justify-center'>
				<Spinner size='large' />
			</Skeleton>
		),
	}
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

export default function TourismMap() {
	const [selectedMunicipality, setSelectedMunicipality] = useState<
		string | undefined
	>(undefined);
	const isMobile = useIsMobile();

	const handleMunicipalityChange = useCallback(
		(municipality: string | undefined) => {
			if (municipality) {
				const formatted = convertToSlug(municipality.toLowerCase());
				setSelectedMunicipality(formatted);
			} else {
				setSelectedMunicipality(undefined);
			}
		},
		[]
	);

	const bgImg = useMemo(
		() => getBgForMunicipality(isMobile, selectedMunicipality),
		[isMobile, selectedMunicipality]
	);

	const imageKey = useMemo(
		() => `img-${selectedMunicipality ?? 'default'}`,
		[selectedMunicipality]
	);

	return (
		<>
			{/* TODO: falta traduzir bredcrumb */}
			<Breadcrumb className='px-custom py-3 border-y-2 border-muted dark:border-muted/70'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/otib'>Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Mapa do Turismo</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<main className='mt-6 bg-background relative px-custom shadow-2xl rounded-2xl w-full flex flex-col items-start justify-start gap-10'>
				<Heading.h1>Mapa do Turismo</Heading.h1>

				<motion.div
					key='content'
					initial={optimizedAnimations.content.initial}
					animate={optimizedAnimations.content.animate}
					transition={optimizedAnimations.content.transition}
					className='w-full flex flex-col md:flex-row-reverse items-center justify-start gap-2 md:gap-2 lg:gap-10 relative z-10'
				>
					<div
						id='map-container'
						className='relative w-full min-h-[480px] md:min-h-[564px] flex flex-col'
					>
						{/* Background image com AnimatePresence otimizada */}
						<AnimatePresence mode='wait'>
							<motion.div
								key={imageKey}
								initial={optimizedAnimations.image.initial}
								animate={optimizedAnimations.image.animate}
								exit={optimizedAnimations.image.exit}
								transition={optimizedAnimations.image.transition}
								className='absolute inset-0 z-0 rounded-2xl overflow-hidden'
							>
								<Image
									src={bgImg}
									alt={`${selectedMunicipality ?? 'default'} background`}
									fill
									priority={!selectedMunicipality}
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px'
									quality={80}
									className='object-cover object-center'
									placeholder='blur'
									blurDataURL={bgImg.blurDataURL}
								/>
							</motion.div>
						</AnimatePresence>

						{/* Container do mapa */}
						<div id='map-content' className='flex items-center relative z-10'>
							<LazyIbiapabaMap
								selected={selectedMunicipality}
								onChangeSelected={handleMunicipalityChange}
							/>
						</div>
					</div>
				</motion.div>
			</main>

			<Footer />
		</>
	);
}
