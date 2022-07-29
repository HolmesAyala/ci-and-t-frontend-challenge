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

export type GetPokemonListData = {
	count: number;
	next: string | null;
	previous: string | null;
	results: PokemonResult[];
};

export async function getPokemonList(props?: GetPokemonListProps): Promise<GetPokemonListData> {
	let queryParams: string = '';

	if (props?.query) {
		const entriesKeysAsStrings: [string, string][] = Object.entries(props.query).map(
			([key, value]) => [key, String(value)]
		);

		const urlSearchParams = new URLSearchParams(entriesKeysAsStrings);

		queryParams = urlSearchParams.toString();
	}

	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?${queryParams}`);

	const body = await response.json();

	return body;
}
