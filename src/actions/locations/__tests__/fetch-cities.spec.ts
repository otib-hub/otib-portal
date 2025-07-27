describe.todo('fetchCities(country, state) unit tests', () => {
	beforeEach(() => {
		vi.resetModules();
	});

	// TODO: implementar testes de fetchCities

	it('recovers sorted static cities when country is Brazil and state is Ceará', async () => {});

	it('fetches and sort Brazil, Ceará states from API when static data is empty or cant be resolved', async () => {});

	it('fetches non-Ceará cities correctly ordered and formatted from API ', async () => {});

	it('throws a readable error when states fetching goes wrong', async () => {});
});
