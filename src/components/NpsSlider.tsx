'use client';

import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface NpsSliderProps {
	value?: number;
	onChangeAction: (value: number) => void;
	hasError?: boolean;
	id?: string;
}

export default function NpsSlider({
	value,
	onChangeAction,
	hasError,
	id,
}: NpsSliderProps) {
	const t = useTranslations('components.NpsSlider');
	const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

	return (
		<div className='w-full flex flex-col items-center gap-3 md:max-w-2xs'>
			<Slider
				id={id}
				value={value ? [value] : [8]}
				onValueChange={(values) => onChangeAction(values[0])}
				min={1}
				max={10}
				step={1}
				showTooltip
				aria-invalid={hasError}
				className={cn(
					'[&>:last-child>span]:border-black [&>:last-child>span]:bg-white [&>:last-child>span]:shadow-none [&>:last-child>span]:size-6.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:ring-offset-0',
					hasError && 'border-destructive'
				)}
			/>
			<span
				className={`font-extrabold ${
					!value ? 'text-muted-foreground text-md animate-pulse' : 'text-xl'
				}`}
			>
				{value ? labels[value - 1] : t('input_placeholder')}
			</span>
		</div>
	);
}
