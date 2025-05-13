import ExampleForm from '@/components/forms/ExampleForm';
import FormSteps from '@/components/FormSteps';
import { Activity, Percent, Plane, User } from 'lucide-react';

const steps = [
	{
		step: 1,
		icon: User,
		title: 'Sobre você',
	},
	{
		step: 2,
		icon: Plane,
		title: 'Sua viagem',
	},
	{
		step: 3,
		icon: Activity,
		title: 'O que você viveu',
	},
	{
		step: 4,
		icon: Percent,
		title: 'Sua experiência',
	},
];

/* https://shadcnui-expansions.typeart.cc/docs/multiple-selector */
/* https://shadcn-extension.vercel.app/docs/introduction */
/* https://github.com/birobirobiro/awesome-shadcn-ui */

export default function FormPage() {
	return (
		<main className='main-container flex flex-col items-start'>
			<FormSteps steps={steps} />
			<ExampleForm />
		</main>
	);
}
