'use client';

import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

type ScrollProgressProps = React.HTMLAttributes<HTMLDivElement>;

export const ScrollProgress = React.forwardRef<
	HTMLDivElement,
	ScrollProgressProps
>(({ className, ...props }, ref) => {
	const progressRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const element = progressRef.current;
		if (!element) return;

		gsap.set(element, { scaleX: 0, height: '2.4px', opacity: 1 });
		gsap.to(element, {
			scaleX: 1,
			scrollTrigger: {
				trigger: document.body,
				start: 'top top',
				end: 'bottom bottom',
				scrub: true,
			},
		});
	}, []);

	return (
		<div
			ref={(node) => {
				progressRef.current = node;
				if (typeof ref === 'function') {
					ref(node);
				} else if (ref) {
					ref.current = node;
				}
			}}
			className={cn(
				'fixed inset-x-0 top-16 z-50 h-[2.4px] opacity-0 origin-left bg-gradient-to-r from-accent to-primary',
				className,
			)}
			{...props}
		/>
	);
});

ScrollProgress.displayName = 'ScrollProgress';
