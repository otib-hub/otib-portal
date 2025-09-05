'use client';

import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { LocaleSwitcher } from '../fragments/LocaleSwitcher';
import { ThemeSwitcher } from '../fragments/ThemeSwitcher';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import { LinkType } from '@/@types/link';

type MobileMenuSheetProps = {
	links: LinkType[];
};

export function MobileMenuSheet({ links }: MobileMenuSheetProps) {
	const [open, setOpen] = useState<boolean>(false);
	const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

	const t = useTranslations('components.Header');
	const path = usePathname();

	const handleRedirectInit = () => {
		setIsRedirecting(true);
	};

	useEffect(() => {
		setOpen(false);
		setIsRedirecting(false);
	}, [path]);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger>
				<SheetTitle>
					<MenuIcon className="size-6" strokeWidth={2.5} />
				</SheetTitle>
			</SheetTrigger>
			<SheetContent className="min-w-3xs sm:min-w-fit flex flex-col items-start justify-start gap-6">
				<div className="flex w-full items-center justify-start gap-2">
					<ThemeSwitcher dropdownAlign="start" />
					<LocaleSwitcher dropdownAlign="start" />
				</div>

				<div className="grid grid-cols-1">
					<strong className="inline-flex text-base font-bold gap-2">
						{t('nav.quick-links.title')}
						{isRedirecting && <Spinner size={'small'} />}
					</strong>
					<div className="grid grid-auto-rows mt-3 space-y-3 text-muted-foreground underline-offset-4">
						{links &&
							links.map((item) => (
								<Link
									key={item.title}
									href={item.url ?? ''}
									className="underline hover:opacity-70 hover:no-underline"
									onClick={handleRedirectInit}
								>
									{item.title}
								</Link>
							))}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
