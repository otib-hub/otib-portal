'use client';

import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '../../../../../components/fragments/LocaleSwitcher';

export function StepOne() {
	const t = useTranslations(
		'forms.IndividualResearchForm.TutorialDialog.steps.1'
	);

	return (
		<>
			<LocaleSwitcher showText className='w-full' />
			<div className='flex flex-col w-full justify-center items-center gap-4 text-sm text-muted-foreground'>
				<p>{t('description')}</p>
				<p>{t('texts.1')}</p>
				<p>{t('texts.2')}</p>
				<p>{t('texts.3')}</p>
				<p>
					<span className='animate-pulse'>{t('texts.4')}</span>
				</p>
			</div>
		</>
	);
}
