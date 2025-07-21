export function scrollToInvalidField(firstInvalidField?: string) {
	if (firstInvalidField) {
		// tenta encontrar o elemento pelo id primeiro
		let el = document.getElementById(firstInvalidField) as HTMLElement | null;

		// se não encontrar pelo id, tenta pelo data-slot="form-control" com aria-invalid
		if (!el) {
			el = document.querySelector(
				`[data-slot="form-control"][aria-invalid="true"]`
			) as HTMLElement | null;
		}

		// se ainda não encontrar, tenta pelo FormItem que contém o erro
		if (!el) {
			const formItem = document.querySelector(
				`[data-slot="form-item"]:has([aria-invalid="true"])`
			) as HTMLElement | null;
			if (formItem) {
				el = formItem;
			}
		}

		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'center' });
			// tenta dar foco no primeiro input/select dentro do elemento
			const focusableElement = el.querySelector(
				'input, select, button, [tabindex]:not([tabindex="-1"])'
			) as HTMLElement;
			if (focusableElement) {
				focusableElement.focus();
			}
		}
	}
}
