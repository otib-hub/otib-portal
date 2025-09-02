import Cookies from 'js-cookie';

vi.mock('js-cookie', () => ({
	default: { set: vi.fn() },
}));

export const mockCookies = vi.mocked(Cookies);
