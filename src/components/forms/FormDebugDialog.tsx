import { TouristIndividualResearchFormType } from '@/app/researches/tourist-individual/_form/TouristIndividualResearch/schemas/form-schema';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { Bug, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ibmPlexMono } from '@/styles/fonts';

interface FormDebugDialogProps {
	readonly data: IndividualResearchFormType;
}

function formatDataToBeautifulPre(data: TouristIndividualResearchFormType) {
	return Object.entries(data).map(([key, value]) => (
		<span key={key} className={`${ibmPlexMono.className}`}>
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
							<span key={item.toString()} className='text-primary'>
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
	const t = useTranslations('components.FormDebugDialog');

	function useAnimateOnDataChange(data: TouristIndividualResearchFormType) {
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
				title={t('trigger_text')}
				ref={animationRef}
				className={`${buttonVariants({
					variant: 'link',
				})} w-full transition-colors ${ibmPlexMono.className}`}
			>
				<Bug className='size-5' />
				{t('trigger_text')}
			</AlertDialogTrigger>
			<AlertDialogContent className='max-h-[calc(100dvh-32)]'>
				<AlertDialogHeader>
					<AlertDialogTitle className='inline-flex text-start justify-between items-center font-extrabold'>
						{t('dialog_title')}
						<AlertDialogAction
							className={`${buttonVariants({
								variant: 'secondary',
							})} bg-transparent shadow-none`}
						>
							<X className='size-5 text-muted-foreground' />
						</AlertDialogAction>
					</AlertDialogTitle>

					<div className='h-full code mb-2 max-h-[calc(100dvh-384px)] overflow-y-auto rounded-md'>
						<pre className='text-wrap bg-card dark:bg-black/50 p-4 text-sm text-start'>
							&#123;
							<br />
							{formatDataToBeautifulPre(data)}
							&#125;
						</pre>
					</div>

					<AlertDialogDescription className='text-primary text-start'>
						{t('dialog_description')}
					</AlertDialogDescription>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
}
