import { LucideIcon } from 'lucide-react';

export type FormStep = {
	step: React.ComponentType;
	number: number;
	title?: string;
	description?: string;
	icon?: LucideIcon;
};
