import { LucideIcon } from 'lucide-react';
import { AnyZodObject } from 'zod';

export type FormStep = {
	step: React.ComponentType;
	schema?: AnyZodObject;
	number: number;
	title?: string;
	description?: string;
	icon?: LucideIcon;
};
