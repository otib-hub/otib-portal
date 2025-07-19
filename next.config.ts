import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
	devIndicators: false,
	output: 'standalone',
	basePath: process.env.NEXT_PUBLIC_APP_BASE_PATH,
	// allowedDevOrigins: ['192.168.1.*'],
	experimental: {
		optimizeCss: true,
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
