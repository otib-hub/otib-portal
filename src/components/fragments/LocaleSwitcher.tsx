'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import { Check, Globe } from 'lucide-react';
import { handleLocaleChange } from '@/actions/locale/handle-locale-change';
import { getUserLocale } from '@/actions/locale/get-user-locale';
import { useEffect, useState } from 'react';
import { languages } from '@/i18n/config';

interface LocaleSwitcherProps {
	showText?: boolean;
	className?: string;
	dropdownAlign?: 'start' | 'end' | 'center' | undefined;
}

export function LocaleSwitcher({
	showText = false,
	className,
	dropdownAlign = 'end',
}: LocaleSwitcherProps) {
	const t = useTranslations();
	const [locale, setLocale] = useState<string>();

	useEffect(() => {
		async function getLocale() {
			const userLocale = await getUserLocale();
			setLocale(userLocale);
		}
		getLocale();
	}, []);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					title={t('components.LocaleSwitcher.title')}
					variant="ghost"
					size="icon"
					className={className}
				>
					<Globe className="size-5" />
					{showText && t('components.LocaleSwitcher.title')}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align={dropdownAlign}>
				{languages.map((lang) => (
					<DropdownMenuItem
						key={lang.locale}
						title={lang.title}
						onClick={() => handleLocaleChange(lang.locale)}
						disabled={locale === lang.locale}
					>
						{lang.title}
						{locale === lang.locale && (
							<Check className="size-4 text-foreground" />
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
