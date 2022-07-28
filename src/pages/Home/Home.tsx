import { useState, useEffect } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

import * as styled from './styled';

import PokemonItem from './components/PokemonItem';

import { getPokemonList, PokemonResult } from '../../api/pokemon/get-pokemon-list';

function Home() {
	const [pokemonListFromApi, setPokemonListFromApi] = useState<PokemonResult[]>([]);

	useEffect(() => {
		const loadPokemonListFromApi = async () => {
			try {
				const responseWithTotalCount = await getPokemonList({ query: { offset: 0, limit: 1 } });

				const responseWithAllData = await getPokemonList({
					query: { offset: 0, limit: responseWithTotalCount.count },
				});

				setPokemonListFromApi(responseWithAllData.results);
			} catch (error) {
				console.error(error);
			}
		};

		loadPokemonListFromApi();
	}, []);

	const pokemonItems: JSX.Element[] = pokemonListFromApi.map((pokemonItem) => (
		<PokemonItem key={pokemonItem.url} imageUrl='' name={pokemonItem.name} />
	));

	return (
		<>
			<styled.Title variant='h1'>Pokedex</styled.Title>

			<styled.SearchField
				autoComplete='off'
				fullWidth
				variant='outlined'
				placeholder='Search pokemon by name'
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Search />
						</InputAdornment>
					),
				}}
			/>

			<styled.PokemonList>{pokemonItems}</styled.PokemonList>
		</>
	);
}

export default Home;
