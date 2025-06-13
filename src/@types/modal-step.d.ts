export type ModalStep = {
	number: number; // começa em 1
	title: string;
	description?: string;
	step: React.ReactNode;
};
