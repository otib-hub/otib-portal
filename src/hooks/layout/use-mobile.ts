import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		const mediaQueriesList = window.matchMedia(
			`(max-width: ${MOBILE_BREAKPOINT - 1}px)`
		);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mediaQueriesList.addEventListener('change', onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mediaQueriesList.removeEventListener('change', onChange);
	}, []);

	return !!isMobile;
}
