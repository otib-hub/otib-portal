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
	H1: createHeading(
		'h1',
		`${ibmPlexSans.className} font-semibold text-3xl`,
	),
	H2: createHeading('h2', 'text-2xl font-semibold'),
	H3: createHeading('h3', 'text-xl font-semibold'),
};
