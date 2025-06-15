'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import { Languages } from 'lucide-react';
import { LocaleENUM } from '@/i18n/config';
import { handleLocaleChange } from '@/services/locale/handle-locale-change';

interface LocaleSwitcherProps {
	showText?: boolean;
	className?: string;
}

export function LocaleSwitcher({ showText = false, className }: LocaleSwitcherProps) {
	const t = useTranslations();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className={className}>
					<Languages className='size-5' />
					{showText  && t('components.LocaleSwitcher.toggle')}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => handleLocaleChange(LocaleENUM.ptBR)}>
					🇧🇷 Português
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleLocaleChange(LocaleENUM.en)}>
					🇺🇸 English
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleLocaleChange(LocaleENUM.es)}>
					🇪🇸 Español
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
