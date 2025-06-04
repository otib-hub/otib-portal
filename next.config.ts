import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
	devIndicators: false,
	basePath: process.env.NEXT_APP_BASE_PATH,
	assetPrefix: process.env.NEXT_APP_ASSET_PREFIX,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
