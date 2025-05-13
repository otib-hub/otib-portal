import ExampleForm from '@/components/forms/ExampleForm';
import FormSteps from '@/components/FormSteps';
import { Activity, Percent, Plane, User } from 'lucide-react';

const steps = [
	{
		step: 1,
		icon: User,
		title: 'Você',
	},
	{
		step: 2,
		icon: Plane,
		title: 'Viagem',
	},
	{
		step: 3,
		icon: Activity,
		title: 'Atividades',
	},
	{
		step: 4,
		icon: Percent,
		title: 'Avaliação',
	},
];

/* https://shadcnui-expansions.typeart.cc/docs/multiple-selector */
/* https://shadcn-extension.vercel.app/docs/introduction */
/* https://github.com/birobirobiro/awesome-shadcn-ui */

export default function FormPage() {
	return (
		<main className='flex flex-col items-start'>
			<FormSteps steps={steps} />
			<ExampleForm />
		</main>
	);
}
