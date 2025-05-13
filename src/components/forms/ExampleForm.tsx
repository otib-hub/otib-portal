'use client';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import FormControlledField from './controlled/FormControlledField';

const exampleFormSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'E-mail é obrigatório' })
		.email({ message: 'E-mail inválido' }),
});

export default function ExampleForm() {
	const form = useForm<z.infer<typeof exampleFormSchema>>({
		resolver: zodResolver(exampleFormSchema),
		defaultValues: {
			email: '',
		},
		mode: 'onTouched',
	});

	function onSubmit(values: z.infer<typeof exampleFormSchema>) {
		toast.success('Form enviado!');
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
				<FormControlledField<typeof exampleFormSchema>
					form={form}
					fieldOptions={{
						name: 'email',
						placeholder: 'Digite seu e-mail',
						type: 'email',
						label: 'E-mail',
					}}
				/>
				<Button type='submit'>Enviar</Button>
			</form>
		</Form>
	);
}
