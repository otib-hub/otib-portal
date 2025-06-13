import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
	devIndicators: false,
	output: 'standalone',
	basePath: process.env.NEXT_PUBLIC_APP_BASE_PATH,
	assetPrefix: process.env.NEXT_APP_ASSET_PREFIX,
	// allowedDevOrigins: ['192.168.1.*'],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
