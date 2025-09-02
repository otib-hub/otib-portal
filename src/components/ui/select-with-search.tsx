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
import { buttonVariants } from '@/components/ui/button';
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import { TFunction } from '@/@types/next-intl';

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

const getPlaceholder = (
	t: TFunction<'components.SelectWithSearch'>,
	multiple: boolean,
	optional: boolean
) => {
	if (multiple) return t('placeholder.multiple');
	if (optional) return t('placeholder.optional');
	return t('placeholder.single');
};

const normalizeValues = (value: string | string[] | undefined): string[] => {
	if (!value) return [];
	return Array.isArray(value) ? value : [value];
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

	const t = useTranslations('components.SelectWithSearch');
	const selectedValues = normalizeValues(value);
	const finalPlaceholder = placeholder || getPlaceholder(t, multiple, optional);

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
		onChangeAction(selectedValues.filter((v) => v !== val));
	};

	const selectedLabels = options.filter((o) =>
		selectedValues.includes(o.value)
	);

	const selectedSummary = multiple
		? t('selection.selected', { count: selectedLabels.length })
		: selectedLabels[0]?.label;

	const shortSelectedSummary = selectedSummary
		? selectedSummary
				.split(' ')
				.slice(1, 3)
				.join(' ')
				.replace(/^./, (c) => c.toUpperCase()) + ':'
		: '';

	return (
		<div className='space-y-2 overflow-hidden'>
			<div className='flex items-center gap-2 w-full min-w-0 overflow-hidden'>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger aria-invalid={hasError} asChild>
						<button
							title='Select with search'
							id={id}
							disabled={disabled}
							aria-disabled={disabled}
							aria-expanded={open}
							className={cn(
								buttonVariants({ variant: 'outline' }),
								'w-full flex-grow flex justify-between items-center text-base bg-input/20 hover:bg-input/35 border-input px-3 py-5 font-normal outline-offset-2 outline-none focus-visible:outline-[3px]',
								hasError && 'border-destructive dark:border-destructive/70'
							)}
						>
							<span
								className={cn(
									'truncate text-left',
									!selectedValues.length && 'text-muted-foreground'
								)}
							>
								{selectedValues.length > 0 ? selectedSummary : finalPlaceholder}
							</span>
							<ChevronDownIcon
								size={16}
								className='ml-2 text-muted-foreground shrink-0'
							/>
						</button>
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
							<CommandList>
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
			</div>

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
								title={`Remove ${item.label}`}
								type='button'
								onClick={(e) => {
									e.stopPropagation();
									removeValue(item.value);
								}}
								className='ml-1 text-muted-foreground hover:text-destructive transition'
								aria-label={`Remove ${item.label}`}
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
