export type GetPokemonListProps = {
	query?: {
		limit?: number;
		offset?: number;
	};
};

export type PokemonResult = {
	name: string;
	url: string;
};

export type GetPokemonListBody = {
	count: number;
	next: string | null;
	previous: string | null;
	results: PokemonResult[];
};

export async function getPokemonList(props?: GetPokemonListProps): Promise<GetPokemonListBody> {
	let queryParams: string = '';

	if (props?.query) {
		const urlSearchParams = new URLSearchParams(
			Object.entries(props.query).map((entry) => [entry[0], String(entry[1])])
		);

		queryParams = urlSearchParams.toString();
	}

	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?${queryParams}`);

	const body = await response.json();

	return body;
}
