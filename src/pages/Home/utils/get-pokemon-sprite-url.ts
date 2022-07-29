export function getPokemonSpriteUrl(pokemonUrl: string) {
	const urlObject = new URL(pokemonUrl);

	const urlSplittedBySlash = urlObject.pathname.split('/');

	const pokemonId = Number(urlSplittedBySlash.at(-1));

	return `https://raw.githubusercontent.com/PokeAPI/sprites/75569c97b9d26c2103f6c3d75772fabe755bbd1e/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
}
