export type StatItem = {
	base_stat: number;
	stat: { name: string };
};

export type GetPokemonDetailData = {
	id: number;
	name: string;
	weight: number;
	height: number;
	base_experience: number;
	order: number;
	sprites: {
		front_default: string | null;
		other: {
			dream_world: {
				front_default: string | null;
			};
		};
	};
	stats: StatItem[];
};

export async function getPokemonDetail(pokemonUrl: string): Promise<GetPokemonDetailData> {
	const response = await fetch(pokemonUrl);

	const body = await response.json();

	return body;
}
