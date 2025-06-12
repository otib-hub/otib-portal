import { IndividualResearchFormType } from '@/forms/IndividualResearchForm/schemas/individual-research-form-schema';
import { formatErrors } from '@/utils/format-errors';

type Payload = Partial<IndividualResearchFormType>;

export async function handleSubmitIndividualResearch(values: Payload) {
	const base = process.env.NEXT_PUBLIC_API_BASE_URL;
	const baseUrl = base || '/api';
	const endpoint = `${baseUrl}/pesquisa-completa/`;

	try {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values),
		});

		if (!response.ok) {
			const errorMsg = `[${response.status}] ~ ${formatErrors(
				await response.json()
			)}`;

			throw new Error(errorMsg);
		}

		return await response.json();
	} catch (err: unknown) {
		if (err instanceof Error) {
			throw new Error(`Can't submit form data ${err.message}`);
		}
		throw new Error('Unknown error submitting form data');
	}
}
