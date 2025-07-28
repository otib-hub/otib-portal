export const mockConsoleError = vi
	.spyOn(console, 'error')
	.mockImplementation(() => {});
