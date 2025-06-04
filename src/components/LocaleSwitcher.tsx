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

export function LocaleSwitcher() {
	const t = useTranslations();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon'>
					<Languages className='size-5' />
					<span className='sr-only'>
						{t('components.LocaleSwitcher.toggle')}
					</span>
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
