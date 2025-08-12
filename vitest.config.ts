/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
// import dotenv from 'dotenv';
// dotenv.config({ path: '.env.test' });

export default defineConfig({
	test: {
		// Configurações existentes mantidas
		environment: 'jsdom',
		globals: true,
		fileParallelism: true,
		setupFiles: ['vitest.setup.ts'],
		globalSetup: ['vitest.global.setup.ts'],
		include: ['src/**/*.{spec,test}.{ts,tsx}'],
		testTimeout: 10000,

		// Configuração de relatórios para SonarQube
		reporters: [
			'default', // Reporter padrão do Vitest
			'verbose', // Reporter detalhado
			[
				'vitest-sonar-reporter',
				{
					outputFile: './coverage/sonar-report.xml',
				},
			],
		],

		// Configuração de cobertura adaptada e expandida
		coverage: {
			// Mantém o provider V8 existente
			provider: 'v8',

			// Formatos de relatório expandidos para incluir SonarQube
			reporter: [
				'html', // Mantém o HTML existente
				'text', // Para visualização no terminal
				'text-summary', // Resumo no terminal
				'lcov', // Para SonarQube (LCOV format)
				'clover', // Formato alternativo
				'json', // Para outras integrações
			],

			// Mantém o diretório existente
			reportsDirectory: './coverage',

			// Mantém os includes existentes
			include: ['src/**/*.{ts,tsx}'],

			// Mantém e expande as exclusões existentes
			exclude: [
				// Exclusões existentes mantidas
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

				// Exclusões adicionais para melhor integração
				'node_modules/',
				'dist/',
				'build/',
				'coverage/',
				'**/*.config.*',
				'**/fixtures/**',
				'**/examples/**',
				'**/docs/**',
			],

			// Configurações adicionais para melhor análise
			all: true, // Inclui arquivos não testados
			skipFull: false, // Não pula arquivos com 100% cobertura
			clean: true, // Limpa o diretório antes de gerar
			cleanOnRerun: true, // Limpa a cada execução

			// Limites de cobertura (opcional - ajuste conforme necessário)
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

	// Mantém os plugins existentes
	plugins: [react()],

	// Mantém as configurações de resolve existentes
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'#': path.resolve(__dirname, 'src/assets'),
		},
	},
});
