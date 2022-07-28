export type GetPokemonDetailData = {
	id: number;
	name: string;
	sprites: {
		front_default: string | null;
		other: {
			dream_world: {
				front_default: string | null;
			};
		};
	};
};

export async function getPokemonDetail(pokemonUrl: string): Promise<GetPokemonDetailData> {
	const response = await fetch(pokemonUrl);

	const body = await response.json();

	return body;
}
