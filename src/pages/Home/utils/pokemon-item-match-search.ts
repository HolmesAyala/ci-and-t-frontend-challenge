import { PokemonResult } from '../../../api/pokemon/get-pokemon-list';

export function pokemonItemMatchSearch(pokemonResult: PokemonResult, search: string): boolean {
	return pokemonResult.name.toLowerCase().includes(search.trim().toLowerCase());
}
