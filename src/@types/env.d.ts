declare namespace NodeJS {
	interface ProcessEnv {
		CURRENT_ENV: string;
		INTERNAL_API_KEY: string;
		NEXT_CURRENT_ENV: string;
		NEXT_PUBLIC_APP_BASE_PATH?: string;
		NEXT_PUBLIC_API_BASE_URL: string;
	}
}
