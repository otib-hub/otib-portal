'use client';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Skeleton } from './skeleton';

type Option = {
	value: string;
	label: string;
};

type SelectWithSearchProps = {
	options: Option[];
	value?: string;
	onChangeAction: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	hasError: boolean;
	id?: string;
	loading?: boolean;
};

export const SelectWithSearch = ({
	options,
	value,
	onChangeAction,
	placeholder = 'Selecione uma opção',
	hasError,
	//disabled = false,
	id,
	loading,
}: SelectWithSearchProps) => {
	const [open, setOpen] = useState(false);

	const selectedLabel = options.find((o) => o.value === value)?.label;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				{loading ? (
					<Skeleton className='w-full h-9 flex items-center justify-start'>
						<p className='px-3 text-muted text-base'>Obtendo dados</p>
					</Skeleton>
				) : (
					<Button
						id={id}
						variant='outline'
						role='combobox'
						aria-expanded={open}
						aria-invalid={hasError}
						className={cn(
							'w-full justify-between text-base bg-input/20 hover:bg-input/35 border-input h-9 px-3 py-6 font-normal outline-offset-0 outline-none focus-visible:outline-[3px] dark:aria-invalid:border-destructive/70 aria-invalid:border-destructive'
						)}
					>
						<span className={cn('truncate', !value && 'text-muted-foreground')}>
							{selectedLabel || placeholder}
						</span>
						<ChevronDownIcon
							size={16}
							className='text-muted-foreground/80 shrink-0'
							aria-hidden='true'
						/>
					</Button>
				)}
			</PopoverTrigger>
			<PopoverContent
				className='border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0'
				align='start'
			>
				<Command>
					<CommandInput placeholder='Buscar...' />
					<CommandList>
						<CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									className='py-2 text-base'
									key={option.value}
									value={option.value}
									onSelect={() => {
										onChangeAction(option.value);
										setOpen(false);
									}}
								>
									{option.label}
									{value === option.value && (
										<CheckIcon size={16} className='ml-auto' />
									)}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
