import { ModeToggle } from '@/components/ModeToggle';
import { ibmPlexSans } from '../styles/fonts';
import { Separator } from './ui/separator';

export default function Header() {
	return (
		<header className='w-full flex flex-col gap-5'>
			<div className='w-full flex justify-between items-center'>
				<h1
					className={`${ibmPlexSans.className} text-3xl font-semibold lg:text-4xl tracking-tight`}
				>
					OTIB
				</h1>
				<ModeToggle />
			</div>
			<Separator />
		</header>
	);
}
