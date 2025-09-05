import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { LocaleSwitcher } from '../fragments/LocaleSwitcher';
import { ThemeSwitcher } from '../fragments/ThemeSwitcher';
import Link from 'next/link';

export function MobileMenuSheet() {
	return (
		<Sheet>
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
					<strong className="text-base font-bold">
						Links rápidos
					</strong>
					<div className="grid grid-auto-rows mt-3 space-y-3 text-muted-foreground underline-offset-4">
						<Link
							href="/soon"
							className="underline hover:opacity-70 hover:no-underline"
						>
							Produções
						</Link>
						<Link
							href="/soon"
							className="underline hover:opacity-70 hover:no-underline"
						>
							Sobre
						</Link>
						<Link
							href="/soon"
							className="underline hover:opacity-70 hover:no-underline"
						>
							Mapa do Turismo
						</Link>
						<Link
							href="/soon"
							className="underline hover:opacity-70 hover:no-underline"
						>
							Parceiros
						</Link>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
