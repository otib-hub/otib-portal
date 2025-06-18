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
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';

export type Option = {
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
	multiple?: boolean;
};

export const SelectWithSearch = ({
	optional = false,
	options,
	value,
	placeholder,
	disabled,
	onChangeAction,
	multiple = false,
	hasError,
	id,
}: SelectWithSearchProps) => {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
	const t = useTranslations('components.SelectWithSearch');

	if (!placeholder)
		placeholder = optional
			? t('placeholder.optional')
			: multiple
			? t('placeholder.multiple')
			: t('placeholder.single');

	const filteredOptions = useMemo(() => {
		if (!search) return options;

		const searchLower = search.toLowerCase();
		return options.filter((option) =>
			option.label.toLowerCase().includes(searchLower)
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

	const selectedLabels = options.filter((o) =>
		selectedValues.includes(o.value)
	);

	const selectedSummary = multiple
		? t('selection.selected', { count: selectedLabels.length })
		: selectedLabels[0]?.label;

	const shortSelectedSummary =
		(selectedSummary ?? '')
			.split(' ')
			.slice(1, 3)
			.join(' ')
			.replace(/^./, (c) => c.toUpperCase()) + ':';

	return (
		<div className='space-y-2 overflow-hidden'>
			<div className='flex items-center gap-2 w-full min-w-0 overflow-hidden'>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							id={id}
							disabled={disabled}
							aria-disabled={disabled}
							variant='outline'
							role='combobox'
							aria-expanded={open}
							aria-invalid={hasError}
							className={cn(
								'w-full flex-grow flex justify-between items-center text-base bg-input/20 hover:bg-input/35 border-input px-3 py-5 font-normal outline-offset-2 outline-none focus-visible:outline-[3px] dark:aria-invalid:border-destructive/70 aria-invalid:border-destructive'
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
					</PopoverTrigger>

					<PopoverContent
						className='border-input w-[var(--radix-popper-anchor-width)] p-0'
						align='start'
					>
						<Command shouldFilter={false}>
							<CommandInput
								placeholder={t('search')}
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
												key={option.label}
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
			</div>

			{/* Badges de opções selecionadas */}
			{multiple && selectedLabels.length > 0 && (
				<div className='border-2 border-accent dark:border-accent/50 bg-accent/35 dark:bg-accent/20 rounded-lg lg:bg-transparent lg:border-0 dark:lg:border-0 dark:lg:bg-transparent py-2 px-3 lg:p-0 flex flex-wrap gap-2 items-center max-h-36 lg:max-h-none overflow-y-auto'>
					<span className='text-accent-foreground/80 text-base'>
						{shortSelectedSummary}
					</span>
					{selectedLabels.map((item) => (
						<Badge
							title={`Clique para remover "${item.label}"`}
							key={item.value}
							onClick={() => removeValue(item.value)}
							variant='secondary'
							className='max-w-full whitespace-pre-wrap bg-chart-5/45 rounded-xl hover:bg-destructive/25 gap-1 text-base cursor-pointer transition-colors'
						>
							{item.label}
							<button
								type='button'
								onClick={() => removeValue(item.value)}
								className='ml-1 text-muted-foreground hover:text-destructive transition'
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
