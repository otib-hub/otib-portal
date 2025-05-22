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
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo, useState } from 'react';
import { Skeleton } from './skeleton';
import { Badge } from '@/components/ui/badge';

type Option = {
	value: string;
	label: string;
};

type SelectWithSearchProps = {
	options: Option[];
	value?: string | string[];
	optional?: boolean;
	onChangeAction: (value: string | string[]) => void;
	placeholder?: string;
	disabled?: boolean;
	hasError: boolean;
	id?: string;
	loading?: boolean;
	multiple?: boolean;
};

export const SelectWithSearch = ({
	optional = false,
	options,
	value,
	onChangeAction,
	multiple = false,
	placeholder = optional
		? 'Selecione zero ou mais opções'
		: multiple
		? 'Selecione pelo menos uma opção'
		: 'Selecione uma opção',

	hasError,
	id,
	loading,
}: SelectWithSearchProps) => {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

	const filteredOptions = useMemo(() => {
		if (!search) return options;

		const searchLower = search.toLowerCase();
		return options.filter((option) =>
			option.label.toLowerCase().startsWith(searchLower)
		);
	}, [options, search]);

	const toggleValue = (val: string) => {
		if (!multiple) {
			onChangeAction(val);
			setOpen(false);
			return;
		}

		const isSelected = selectedValues.includes(val);
		const updated = isSelected
			? selectedValues.filter((v) => v !== val)
			: [...selectedValues, val];

		onChangeAction(updated);
	};

	const removeValue = (val: string) => {
		const updated = selectedValues.filter((v) => v !== val);
		onChangeAction(updated);
	};

	const clearAll = () => {
		onChangeAction([]);
	};

	const selectedLabels = options.filter((o) =>
		selectedValues.includes(o.value)
	);

	const selectedSummary = multiple
		? selectedLabels.length +
		  ` opç${selectedLabels.length > 1 ? 'ões' : 'ão'} selecionad${
				selectedLabels.length > 1 ? 'as' : 'a'
		  }`
		: selectedLabels[0]?.label;

	return (
		<div className='space-y-2 overflow-hidden'>
			<div className='flex items-center gap-2 w-full min-w-0 overflow-hidden'>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						{loading ? (
							<Skeleton className='flex-grow min-w-0 flex items-center justify-start'>
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
									'flex-grow flex justify-between items-center text-base bg-input/20 hover:bg-input/35 border-input px-3 py-5 font-normal outline-offset-2 outline-none focus-visible:outline-[3px] dark:aria-invalid:border-destructive/70 aria-invalid:border-destructive'
								)}
							>
								<span
									className={cn(
										'truncate text-left',
										!selectedValues.length && 'text-muted-foreground'
									)}
								>
									{selectedValues.length > 0 ? selectedSummary : placeholder}
								</span>
								<ChevronDownIcon
									size={16}
									className='ml-2 text-muted-foreground shrink-0'
								/>
							</Button>
						)}
					</PopoverTrigger>

					<PopoverContent
						className='border-input w-[var(--radix-popper-anchor-width)] p-0'
						align='start'
					>
						<Command shouldFilter={false}>
							<CommandInput
								placeholder='Buscar...'
								value={search}
								onValueChange={setSearch}
							/>
							<CommandList className=''>
								<CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
								<CommandGroup>
									{filteredOptions.map((option) => {
										const isSelected = selectedValues.includes(option.value);
										return (
											<CommandItem
												className='py-2 text-base'
												key={option.value}
												value={option.value}
												onSelect={() => toggleValue(option.value)}
											>
												{option.label}
												{isSelected && (
													<CheckIcon size={16} className='ml-auto' />
												)}
											</CommandItem>
										);
									})}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>

				{/* Botão limpar entre o popover e os badges */}
				{multiple && selectedValues.length > 0 && (
					<Button
						variant='ghost'
						type='button'
						onClick={clearAll}
						className='text-muted-foreground hover:text-foreground transition p-1 flex-shrink-0'
						aria-label='Limpar todos'
					>
						<XIcon size={18} />
					</Button>
				)}
			</div>

			{/* Badges de opções selecionadas */}
			{multiple && selectedLabels.length > 0 && (
				<div className='border-2 border-muted-foreground/20 bg-muted/30 dark:bg-muted/40 rounded-lg lg:bg-transparent lg:border-0 dark:lg:border-0 dark:lg:bg-transparent py-2 px-3 lg:p-0 flex flex-wrap gap-2 items-center max-h-36 lg:max-h-none overflow-y-auto'>
					<span className='text-muted-foreground text-base'>
						Opç{selectedLabels.length > 1 ? 'ões' : 'ão'} selecionad
						{selectedLabels.length > 1 ? 'as' : 'a'}:
					</span>
					{selectedLabels.map((item) => (
						<Badge
							title={`Clique para remover "${item.label}"`}
							key={item.value}
							onClick={() => removeValue(item.value)}
							variant='secondary'
							className='max-w-full whitespace-pre-wrap bg-chart-5/30 hover:bg-chart-5/45 gap-1 text-base cursor-pointer transition-colors'
						>
							{item.label}
							<button
								type='button'
								onClick={() => removeValue(item.value)}
								className='ml-1 text-muted-foreground hover:text-foreground transition'
								aria-label={`Remover ${item.label}`}
							>
								<XIcon size={12} />
							</button>
						</Badge>
					))}
				</div>
			)}
		</div>
	);
};
