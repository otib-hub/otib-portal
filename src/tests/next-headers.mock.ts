/* eslint-disable @typescript-eslint/no-explicit-any */

export const createCookiesMock = (cookieValue?: string) => {
	const mockGet = vi.fn();

	if (cookieValue) {
		mockGet.mockReturnValue({ value: cookieValue });
	} else {
		mockGet.mockReturnValue(undefined);
	}

	return {
		get: mockGet,
	} as any;
};

export const createHeadersMock = (headerValue: string | null) => {
	const mockGet = vi.fn().mockReturnValue(headerValue);

	return {
		get: mockGet,
	} as any;
};

export const createCookiesErrorMock = (error: Error) => {
	return vi.fn().mockRejectedValue(error);
};

export const createHeadersErrorMock = (error: Error) => {
	return vi.fn().mockRejectedValue(error);
};

export const setupCookiesMock = (mockCookies: any, cookieValue?: string) => {
	mockCookies.mockResolvedValue(createCookiesMock(cookieValue));
};

export const setupHeadersMock = (
	mockHeaders: any,
	headerValue: string | null
) => {
	mockHeaders.mockResolvedValue(createHeadersMock(headerValue));
};

export const setupCookiesError = (mockCookies: any, error: Error) => {
	mockCookies.mockRejectedValue(error);
};

export const setupHeadersError = (mockHeaders: any, error: Error) => {
	mockHeaders.mockRejectedValue(error);
};
