'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Locale, useTranslations } from 'next-intl';
import { Languages } from 'lucide-react';
import { LocaleENUM } from '@/i18n/config';

export function LocaleSwitcher() {
	const t = useTranslations();

	async function handleLocaleChange(locale: Locale) {
		await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/set-locale`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ locale }),
		});

		setTimeout(() => {
			window.location.reload();
		}, 100);
	}

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
