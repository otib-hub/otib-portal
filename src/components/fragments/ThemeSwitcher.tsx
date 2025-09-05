'use client';

import { Check, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';

const themes = [
	{
		name: 'light',
		translation: 'components.ThemeSwitcher.light',
	},
	{
		name: 'dark',
		translation: 'components.ThemeSwitcher.dark',
	},
	{
		name: 'system',
		translation: 'components.ThemeSwitcher.system',
	},
];

type ThemeSwitcherProps = {
	dropdownAlign?: 'start' | 'end' | 'center' | undefined;
};

export function ThemeSwitcher({ dropdownAlign = 'end' }: ThemeSwitcherProps) {
	const { theme: actualTheme, setTheme } = useTheme();
	const t = useTranslations();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					title={t('components.ThemeSwitcher.title')}
					variant="ghost"
					size="icon"
				>
					<Sun className="size-5 block dark:hidden" />
					<Moon className="size-5 hidden dark:block" />
					<span className="sr-only">
						{t('components.ThemeSwitcher.title')}
					</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align={dropdownAlign}>
				{themes.map((theme) => (
					<DropdownMenuItem
						title={theme.name}
						key={theme.name}
						onClick={() => setTheme(theme.name)}
						disabled={theme.name === actualTheme}
					>
						{t(theme.translation)}
						{actualTheme === theme.name && (
							<Check className="size-4 text-foreground" />
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
