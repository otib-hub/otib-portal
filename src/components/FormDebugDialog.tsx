import { ExampleFormType } from '@/forms/ExampleForm/schemas/form-general-schema';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog';
import { buttonVariants } from './ui/button';
import { Bug, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface FormDebugDialogProps {
	data: ExampleFormType;
}

function formatDataToBeautifulPre(data: ExampleFormType) {
	return Object.entries(data).map(([key, value]) => (
		<span key={key}>
			<span className='text-foreground'>&#9;&#9;{key}</span>
			{': '}
			<span>
				{typeof value === 'string' && (
					<span className='text-primary'>{`"${value}"`}</span>
				)}
				{Array.isArray(value) && (
					<span className='text-chart-4'>
						[
						{value.map((item, idx) => (
							<span key={idx} className='text-primary'>
								&quot;{item}&quot;
								{idx < value.length - 1 ? (
									<span className='text-foreground'>, </span>
								) : (
									''
								)}
							</span>
						))}
						]
					</span>
				)}
				{typeof value === 'undefined' && (
					<span className='text-muted-foreground/50'>undefined</span>
				)}
				{typeof value === 'number' && (
					<span className='text-chart-3'>{`${value}`}</span>
				)}
				{typeof value === 'boolean' && (
					<span className='text-chart-1'>{`${value}`}</span>
				)}
			</span>
			<br />
		</span>
	));
}

export default function FormDebugDialog({ data }: FormDebugDialogProps) {
	function useAnimateOnDataChange(data: ExampleFormType) {
		const ref = useRef<HTMLButtonElement | null>(null);

		useEffect(() => {
			if (ref.current) {
				ref.current.classList.add('animate-flash');
				const timeout = setTimeout(() => {
					ref.current?.classList.remove('animate-flash');
				}, 501);
				return () => clearTimeout(timeout);
			}
		}, [data]);

		return ref;
	}

	const animationRef = useAnimateOnDataChange(data);

	return (
		<AlertDialog>
			<AlertDialogTrigger
				ref={animationRef}
				className={`${buttonVariants({
					variant: 'link',
				})} w-full transition-colors`}
			>
				<Bug className='size-5' />
				Debugar conteúdo do formulário
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader className=''>
					<AlertDialogTitle className='inline-flex text-start justify-between items-center font-extrabold'>
						Conteúdo enviado do Formulário
						<AlertDialogAction
							className={`${buttonVariants({
								variant: 'secondary',
							})} bg-transparent shadow-none`}
						>
							<X className='size-5 text-muted-foreground' />
						</AlertDialogAction>
					</AlertDialogTitle>

					<div className='code mb-2'>
						<pre className='text-wrap bg-card dark:bg-black/50 p-4 text-sm text-start'>
							&#123;
							<br />
							{formatDataToBeautifulPre(data)}
							&#125;
						</pre>
					</div>

					<AlertDialogDescription className='text-primary text-start'>
						Esta opção está disponível somente em ambiente de desenvolvimento
					</AlertDialogDescription>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
}
