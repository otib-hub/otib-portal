import { IndividualResearchFormType } from '@/forms/IndividualResearchForm/schemas/individual-research-form-schema';
import { formatErrors } from '@/utils/format-errors';

type Payload = Partial<IndividualResearchFormType>;

export async function handleSubmitIndividualResearch(values: Payload) {
	const endpoint =
		process.env.NEXT_PUBLIC_APP_BASE_PATH + '/api/individual-research';

	try {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		});

		const json = await response.json();
		if (!response.ok) {
			const errorMsg = `[${response.status}] ~ ${formatErrors(json)}`;
			throw new Error(errorMsg);
		}

		return json;
	} catch (err: unknown) {
		if (err instanceof Error) {
			throw new Error(`Can't submit form data ${err.message}`);
		}
		throw new Error('Unknown error submitting form data');
	}
}
