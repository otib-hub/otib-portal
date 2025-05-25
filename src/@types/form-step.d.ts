import { LucideIcon } from 'lucide-react';
import { AnyZodObject } from 'zod';
import { TFunction } from './next-intl';

export type FormStep = {
	step: React.ComponentType;
	schema?: AnyZodObject | TFunction;
	number: number;
	title?: string;
	description?: string;
	icon?: LucideIcon;
};
