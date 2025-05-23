import { FormStep } from '@/@types/form-step';
import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperSeparator,
	StepperTitle,
	StepperTrigger,
} from '@/components/ui/stepper';
import React from 'react';

interface FormStepperProps {
	steps: FormStep[];
	activeStep?: number;
}

export default function FormStepper({ steps, activeStep }: FormStepperProps) {
	return (
		<Stepper className='w-full my-8' value={activeStep}>
			{steps.map((step, idx) => (
				<StepperItem
					key={step.number}
					step={step.number}
					className='not-last:flex-1 max-md:items-start'
				>
					<StepperTrigger className='rounded max-md:flex-col'>
						<StepperIndicator asChild>
							{step.icon
								? React.createElement(step.icon, {
										size: 16,
								  })
								: step.number}
						</StepperIndicator>
						<div className='text-center md:text-left'>
							<StepperTitle>{step.title}</StepperTitle>
						</div>
					</StepperTrigger>
					{idx < steps.length && (
						<StepperSeparator className='max-md:mt-3.5 md:mx-4' />
					)}
				</StepperItem>
			))}
		</Stepper>
	);
}
