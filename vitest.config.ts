/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
// import dotenv from 'dotenv';
// dotenv.config({ path: '.env.test' });

export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		fileParallelism: true,
		setupFiles: ['vitest.setup.ts'],
		globalSetup: ['vitest.global.setup.ts'],
		include: ['src/**/*.{spec,test}.{ts,tsx}'],
		testTimeout: 10000,

		// Configuração de relatórios para SonarQube
		reporters: [
			'default',
			'verbose', // Reporter detalhado
			[
				'vitest-sonar-reporter',
				{ outputFile: './coverage/sonar-report.xml' },
			],
		],

		coverage: {
			provider: 'v8',
			reporter: [
				'html',
				'text',
				'text-summary',
				'lcov', // Para SonarQube (LCOV format)
				'clover',
				'json',
			],
			reportsDirectory: './coverage',
			include: ['src/**/*.{ts,tsx}'],
			exclude: [
				'**/*.test.{ts,tsx}',
				'**/*.spec.{ts,tsx}',
				'**/@types/**',
				'**/types/**',
				'**/*.d.ts',
				'**/*.type.{ts,tsx}',
				'**/*.types.{ts,tsx}',
				'**/*.contract.{ts,tsx}',
				'**/*.protocol.{ts,tsx}',
				'**/*.interface.{ts,tsx}',
				'src/app/**/layout.{ts,tsx}',
				'**/*.mock.{ts,tsx}',
				'**/*.mocks.{ts,tsx}',
				'**/tests/**',
				'**/mocks/**',
				'**/__mocks__/**',
				'**/__tests__/**',
				'**/__test-utils__/**',
				'**/*.test-util.ts',
				'**/*.story.{ts,tsx}',
				'**/*.stories.{ts,tsx}',
				'**/stories/**',
				'**/__stories__/**',

				'node_modules/',
				'dist/',
				'build/',
				'coverage/',
				'**/*.config.*',
				'**/fixtures/**',
				'**/examples/**',
				'**/docs/**',
			],
			all: true,
			skipFull: false,
			clean: true,
			cleanOnRerun: true,
			thresholds: {
				global: {
					branches: 70,
					functions: 70,
					lines: 70,
					statements: 70,
				},
			},
		},
	},
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'#': path.resolve(__dirname, 'src/assets'),
		},
	},
});
