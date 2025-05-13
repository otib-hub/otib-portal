import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '../../ui/input';
import { Path, UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { z } from 'zod';

interface FormControlledFieldProps<T extends z.ZodType> {
	form: UseFormReturn<z.infer<T>>;
	fieldOptions: {
		name: Path<z.infer<T>>;
		placeholder: string;
		label?: string;
		type: string;
		description?: string;
	};
	className?: string;
}

export default function FormControlledField<T extends z.ZodType>({
	form,
	fieldOptions,
	className,
}: FormControlledFieldProps<T>) {
	return (
		<FormField
			control={form.control}
			name={fieldOptions.name}
			render={({ field }) => (
				<FormItem className='w-full space-y-2'>
					{fieldOptions.label && (
						<FormLabel className='font-semibold'>
							{fieldOptions.label}
						</FormLabel>
					)}
					<FormControl className='w-full'>
						<Input
							className={`w-full max-w-3xl ${cn(className)}`}
							placeholder={fieldOptions.placeholder}
							type={fieldOptions.type}
							{...field}
						/>
					</FormControl>
					{fieldOptions.description && (
						<FormDescription>{fieldOptions.description}</FormDescription>
					)}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
