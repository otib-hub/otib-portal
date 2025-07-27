import { afterEach, expect, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// roda apos cada teste limpando arvores do react e mocks
afterEach(async () => {
	cleanup();
	vi.clearAllMocks();
});
