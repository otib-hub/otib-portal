import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
	output: 'standalone',
	basePath: process.env.NEXT_PUBLIC_APP_BASE_PATH,
	experimental: {
		esmExternals: true,
		optimizePackageImports: ['echarts', 'recharts', 'gsap'],
		optimizeCss: true,
	},
};

const withAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
	analyzerMode: 'static',
	openAnalyzer: false,
});

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(withAnalyzer(nextConfig));
