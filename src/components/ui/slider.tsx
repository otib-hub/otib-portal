'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	showTooltip = false,
	tooltipContent,
	...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
	showTooltip?: boolean;
	tooltipContent?: (value: number) => React.ReactNode;
}) {
	const [internalValues, setInternalValues] = React.useState<number[]>(
		Array.isArray(value)
			? value
			: Array.isArray(defaultValue)
			? defaultValue
			: [min, max]
	);

	React.useEffect(() => {
		if (value !== undefined) {
			setInternalValues(Array.isArray(value) ? value : [value]);
		}
	}, [value]);

	const handleValueChange = (newValue: number[]) => {
		setInternalValues(newValue);
		props.onValueChange?.(newValue);
	};

	const [showTooltipState, setShowTooltipState] = React.useState(false);

	const handlePointerDown = () => {
		if (showTooltip) {
			setShowTooltipState(true);
		}
	};

	const handlePointerUp = React.useCallback(() => {
		if (showTooltip) {
			setShowTooltipState(false);
		}
	}, [showTooltip]);

	React.useEffect(() => {
		if (showTooltip) {
			document.addEventListener('pointerup', handlePointerUp);
			return () => {
				document.removeEventListener('pointerup', handlePointerUp);
			};
		}
	}, [showTooltip, handlePointerUp]);

	const renderThumb = (value: number) => {
		const thumb = (
			<SliderPrimitive.Thumb
				data-slot='slider-thumb'
				className='border-primary bg-white ring-ring/50 block size-5 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] outline-none hover:ring-4 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50'
				onPointerDown={handlePointerDown}
			/>
		);

		if (!showTooltip) return thumb;

		return (
			<TooltipProvider>
				<Tooltip open={showTooltipState}>
					<TooltipTrigger asChild>{thumb}</TooltipTrigger>
					<TooltipContent
						className='px-2 py-1 text-xs'
						sideOffset={8}
						side={props.orientation === 'vertical' ? 'right' : 'top'}
					>
						<p>{tooltipContent ? tooltipContent(value) : value}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	};

	return (
		<SliderPrimitive.Root
			data-slot='slider'
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			className={cn(
				'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
				className
			)}
			onValueChange={handleValueChange}
			{...props}
		>
			<SliderPrimitive.Track
				data-slot='slider-track'
				className={cn(
					'bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5'
				)}
			>
				{/* Custom colored ranges */}
				{/* 1-6: Red, 7-8: Yellow, 9-10: Green (arbitrary colors) */}
				<div className='absolute inset-0 flex w-full h-full pointer-events-none'>
					{/* 1-6 */}
					<div
						className='h-full bg-destructive'
						style={{
							width: `${((6 - min) / (max - min)) * 100}%`,
						}}
					/>
					{/* 7-8 */}
					<div
						className='h-full bg-yellow-400 dark:bg-yellow-300'
						style={{
							width: `${((8 - 6) / (max - min)) * 100}%`,
						}}
					/>
					{/* 9-10 */}
					<div
						className='h-full bg-primary'
						style={{
							width: `${((max - 8) / (max - min)) * 100}%`,
						}}
					/>
				</div>
				{/* Overlay the actual range for interaction */}
				<SliderPrimitive.Range
					data-slot='slider-range'
					className={cn(
						'bg-transparent absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full'
					)}
				/>
			</SliderPrimitive.Track>
			{Array.from({ length: internalValues.length }, (_, index) => (
				<React.Fragment key={index}>
					{renderThumb(internalValues[index])}
				</React.Fragment>
			))}
		</SliderPrimitive.Root>
	);
}

export { Slider };
