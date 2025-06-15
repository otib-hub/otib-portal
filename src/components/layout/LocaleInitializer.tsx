'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';

export function LocaleInitializer() {
	useEffect(() => {
		const existing = Cookies.get('NEXT_LOCALE');
		if (!existing) {
			const locale = navigator.language.split('-')[0];
			Cookies.set('NEXT_LOCALE', locale, { expires: 30 });
			window.location.reload();
		}
	}, []);

	return null;
}
