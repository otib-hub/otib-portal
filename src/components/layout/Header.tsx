import { ThemeSwitcher } from '@/components/fragments/ThemeSwitcher';
import Link from 'next/link';
import { LocaleSwitcher } from '@/components/fragments/LocaleSwitcher';
import { ibmPlexSans } from '@/styles/fonts';
import { OtibLogo } from './OtibLogo';

export default function Header() {
	return (
		<header className='px-custom w-full py-5 md:py-6 flex flex-col gap-5'>
			<div className='w-full flex justify-between items-center'>
				<Link href='/'>
					<div className='inline-flex gap-2 justify-start items-center hover:opacity-70 cursor-pointer transition-opacity'>
						<OtibLogo variant='icon' className='h-8' />
						<span
							className={`${ibmPlexSans.className} font-semibold text-3xl md:text-3xl lg:text-4xl tracking-tight`}
						>
							OTIB
						</span>
					</div>
				</Link>

				<div className='flex items-center justify-start gap-2'>
					<LocaleSwitcher />
					<ThemeSwitcher />
				</div>
			</div>
		</header>
	);
}
