import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperSeparator,
	StepperTitle,
	StepperTrigger,
} from '@/components/ui/stepper';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface Step {
	step: number;
	title?: string;
	description?: string;
	icon?: LucideIcon;
}

interface FormStepsProps {
	steps: Step[];
	activeStep?: number;
}

export default function FormSteps({ steps, activeStep }: FormStepsProps) {
	return (
		<div className='space-y-8 text-center w-full mb-6'>
			<Stepper value={activeStep} defaultValue={1}>
				{steps.map(({ step, title, icon }) => (
					<StepperItem
						key={step}
						step={step}
						className='not-last:flex-1 max-md:items-start'
					>
						<StepperTrigger className='rounded max-md:flex-col'>
							<StepperIndicator asChild>
								{icon
									? React.createElement(icon, {
											size: 16,
									  })
									: step}
							</StepperIndicator>
							<div className='text-center md:text-left'>
								<StepperTitle>{title}</StepperTitle>
							</div>
						</StepperTrigger>
						{step < steps.length && (
							<StepperSeparator className='max-md:mt-3.5 md:mx-4' />
						)}
					</StepperItem>
				))}
			</Stepper>
		</div>
	);
}
