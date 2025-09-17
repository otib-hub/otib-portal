import { render } from '@testing-library/react';
import { scrollToInvalidField } from '../scroll-to-invalid-field';

describe('scrollToInvalidField() - unit tests', () => {
	let scrollIntoViewMock: ReturnType<typeof vi.fn>;
	let focusMock: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		scrollIntoViewMock = vi.fn();
		focusMock = vi.fn();
	});

	it('should scroll and focus element found by id', () => {
		const { container } = render(
			<form>
				<div id="username">
					<input aria-invalid="true" data-testid="input" />
				</div>
			</form>,
		);

		const wrapper = container.querySelector('#username') as HTMLElement;
		wrapper.scrollIntoView = scrollIntoViewMock;

		const input = wrapper.querySelector('input') as HTMLInputElement;
		input.focus = focusMock;

		scrollToInvalidField('username');

		expect(scrollIntoViewMock).toHaveBeenCalledWith({
			behavior: 'smooth',
			block: 'center',
		});
		expect(focusMock).toHaveBeenCalled();
	});

	it('should fall back to [data-slot=form-control][aria-invalid=true]', () => {
		const { container } = render(
			<div data-slot="form-control" aria-invalid="true">
				<input />
			</div>,
		);

		const wrapper = container.firstChild as HTMLElement;
		wrapper.scrollIntoView = scrollIntoViewMock;

		const input = wrapper.querySelector('input') as HTMLInputElement;
		input.focus = focusMock;

		scrollToInvalidField('nonexistent');

		expect(scrollIntoViewMock).toHaveBeenCalled();
		expect(focusMock).toHaveBeenCalled();
	});

	it('should fall back to [data-slot=form-item]:has([aria-invalid=true])', () => {
		const { container } = render(
			<div data-slot="form-item">
				<input aria-invalid="true" />
			</div>,
		);

		const formItem = container.firstChild as HTMLElement;
		formItem.scrollIntoView = scrollIntoViewMock;

		const input = formItem.querySelector('input') as HTMLInputElement;
		input.focus = focusMock;

		scrollToInvalidField('nonexistent');

		expect(scrollIntoViewMock).toHaveBeenCalled();
		expect(focusMock).toHaveBeenCalled();
	});

	it('should do nothing if no element is found', () => {
		render(<div />);

		expect(() => scrollToInvalidField('nonexistent')).not.toThrow();
		expect(scrollIntoViewMock).not.toHaveBeenCalled();
		expect(focusMock).not.toHaveBeenCalled();
	});

	it('should do nothing if no firstInvalidField is provided', () => {
		render(<div />);

		scrollToInvalidField();

		expect(scrollIntoViewMock).not.toHaveBeenCalled();
		expect(focusMock).not.toHaveBeenCalled();
	});
});
