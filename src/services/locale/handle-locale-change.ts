import { Locale } from 'next-intl';

export async function handleLocaleChange(locale: Locale) {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
		const url = baseUrl.startsWith('/') ? baseUrl : `/${baseUrl}`;

		const response = await fetch(`${url}/set-locale`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ locale }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();

		if (result.success) {
			setTimeout(() => {
				window.location.reload();
			}, 200);
		} else {
			console.error('Error assigning locale:', result.error);
		}
	} catch (error) {
		console.error('Error switching language:', error);
	}
}
