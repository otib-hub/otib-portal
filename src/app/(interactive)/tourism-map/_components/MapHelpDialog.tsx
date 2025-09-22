'use client';

import { buttonVariants } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { CircleQuestionMarkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function MapHelpDialog() {
	const t = useTranslations('app.tourism-map.MapHelpDialog');
	return (
		<Dialog>
			<DialogTrigger>
				<CircleQuestionMarkIcon className="size-6 place-self-center-safe text-muted-foreground/80" />
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>{t('title')}</DialogTitle>
				<DialogDescription className="text-muted-foreground">
					{t('description.0')} {t('description.1')}
				</DialogDescription>
				<DialogFooter>
					<DialogClose className={buttonVariants()}>
						{t('footerCloseButton')}
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
