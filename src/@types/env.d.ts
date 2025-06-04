declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: string;
		NEXT_APP_BASE_PATH?: string;
		NEXT_APP_ASSET_PREFIX?: string;
		NEXT_PUBLIC_API_BASE_URL: string;
		COUNTRIESNOW_API_BASE_URL: string;
	}
}
