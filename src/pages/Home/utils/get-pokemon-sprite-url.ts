import { environmentVars } from '../../../environment-vars';

export function getPokemonSpriteUrl(pokemonUrl: string) {
	const urlObject = new URL(pokemonUrl);

	const urlSplittedBySlash = urlObject.pathname.split('/');

	const pokemonId = Number(urlSplittedBySlash.at(-1));

	return `${environmentVars.assetsBaseUrl}/${pokemonId}.svg`;
}
