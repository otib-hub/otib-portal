'use client';

import { Slider } from '@/components/ui/slider';

interface NpsSliderProps {
	value?: number;
	onChangeAction: (value: number) => void;
	hasError?: boolean;
	id?: string;
}

export default function NpsSlider({
	value = 8,
	onChangeAction,
	hasError,
	id,
}: NpsSliderProps) {
	const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

	return (
		<div className='w-full flex flex-col items-center gap-3 md:max-w-2xs'>
			<Slider
				id={id}
				value={[value]}
				onValueChange={(values) => onChangeAction(values[0])}
				min={1}
				max={10}
				step={1}
				showTooltip
				aria-label='Dê uma nota para sua experiência de 1 a 10'
				aria-invalid={hasError}
				className={
					hasError
						? 'border-destructive'
						: '' +
						  '[&>:last-child>span]:border-black [&>:last-child>span]:bg-white **:data-[slot=slider-thumb]:shadow-none [&>:last-child>span]:size-6.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:ring-offset-0'
				}
			/>
			<span className='text-2xl font-extrabold'>{labels[value - 1]}</span>
		</div>
	);
}
