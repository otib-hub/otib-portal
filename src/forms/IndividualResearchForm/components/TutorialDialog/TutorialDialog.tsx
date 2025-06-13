'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import useMultiStepModal from '@/hooks/use-multistep-modal';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTutorialDialogSteps } from './steps';
import { useTranslations } from 'next-intl';

export function TutorialDialog() {
	const t = useTranslations('forms');
	const steps = getTutorialDialogSteps(t);

	const [isOpen, setIsOpen] = useState(false);
	const params = useSearchParams();
	const {
		currentStep,
		currentStepIndex,
		nextStep,
		backStep,
		isLastStep,
		isFirstStep,
	} = useMultiStepModal({ steps });

	// modal de tutorial só é mostrado quando há um query param ?referrer=algo
	useEffect(() => {
		if (params.get('referrer')) {
			setIsOpen(true);
		}
	}, [params]);

	return (
		<Dialog open={isOpen} modal onOpenChange={setIsOpen}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader className='text-start'>
					<DialogTitle className='font-bold'>
						{steps[currentStepIndex].title}
					</DialogTitle>
					<DialogDescription>
						{steps[currentStepIndex].description &&
							steps[currentStepIndex].description}
					</DialogDescription>
				</DialogHeader>

				{currentStep}

				<DialogFooter className='flex-col md:flex-row'>
					{!isFirstStep && (
						<Button variant='outline' onClick={backStep}>
							{t('common.button_back')}
						</Button>
					)}

					{isLastStep ? (
						<Button onClick={() => setIsOpen(false)}>
							{t('common.button_close')}
						</Button>
					) : (
						<Button onClick={nextStep}>{t('common.button_next')}</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
