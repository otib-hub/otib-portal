import React, { JSX } from 'react';
import clsx from 'clsx';
import { ibmPlexSans } from '@/styles/fonts';

type HeadingProps = {
	children: React.ReactNode;
	className?: string;
};

function createHeading(tag: keyof JSX.IntrinsicElements, defaultClass: string) {
	return function HeadingTag({ children, className }: HeadingProps) {
		const Component = tag;
		return (
			<Component className={clsx(defaultClass, className)}>
				{children}
			</Component>
		);
	};
}

export const Heading = {
	h1: createHeading('h1', `${ibmPlexSans.className} font-semibold text-4xl`),
	h2: createHeading('h2', 'text-3xl font-semibold'),
	h3: createHeading('h3', 'text-2xl font-semibold'),
	h4: createHeading('h4', 'text-xl font-medium'),
	h5: createHeading('h5', 'text-lg font-medium'),
	h6: createHeading('h6', 'text-base font-medium'),
};
