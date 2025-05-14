import { buttonVariants } from '@/components/ui/button';
import { ibmPlexSans } from '@/styles/fonts';
import { ClipboardList } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
	return (
		<main
			className={`w-full h-[calc(100dvh-109px-24px)] flex flex-col justify-center items-center gap-8 text-4xl lg:text-5xl font-semibold tracking-tight`}
		>
			<h1 className={`${ibmPlexSans.className} text-center`}>
				Bem vindo ao protótipo do OTIB!
			</h1>
			<Link
				className={`${buttonVariants({
					variant: 'default',
				})}  flex font-bold`}
				href='/form'
			>
				<ClipboardList size={24} />
				Formulário de teste
			</Link>
		</main>
	);
}
