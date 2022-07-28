import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

import * as styled from './styled';

import PokemonItem from './components/PokemonItem';
import PokemonDialog from './components/PokemonDialog';

import { getPokemonList, PokemonResult } from '../../api/pokemon/get-pokemon-list';

const DEBOUNCE_SEARCH_TIME: number = 200; // Milliseconds

let debounceSearchTimeout: NodeJS.Timeout;

function Home() {
	const [pokemonListFromApi, setPokemonListFromApi] = useState<PokemonResult[]>([]);

	const [search, setSearch] = useState('');

	const [searchDebounced, setSearchDebounced] = useState('');

	const [pokemonListBySearch, setPokemonListBySearch] = useState<PokemonResult[]>([]);

	const [pokemonDialogIsOpen, setPokemonDialogIsOpen] = useState(false);

	const [pokemonItemToShow, setPokemonItemToShow] = useState<PokemonResult | null>(null);

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

	useEffect(() => {
		setPokemonListBySearch(
			pokemonListFromApi.filter((pokemonItem) =>
				pokemonItem.name.toLowerCase().includes(searchDebounced.trim().toLowerCase())
			)
		);
	}, [pokemonListFromApi, searchDebounced]);

	const onCloseFromPokemonDialog = () => {
		setPokemonDialogIsOpen(false);
	};

	const onChangeFromSearchField = (event: ChangeEvent<HTMLInputElement>) => {
		const { value: search } = event.target;

		setSearch(search);

		clearInterval(debounceSearchTimeout);

		debounceSearchTimeout = setTimeout(() => {
			setSearchDebounced(search);
		}, DEBOUNCE_SEARCH_TIME);
	};

	const onClickFromPokemonItem = (pokemonItem: PokemonResult) => {
		setPokemonItemToShow(pokemonItem);
		setPokemonDialogIsOpen(true);
	};

	const searchField: JSX.Element = (
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
			value={search}
			onChange={onChangeFromSearchField}
		/>
	);

	const pokemonItemsToRender: JSX.Element[] = useMemo(() => {
		return pokemonListBySearch.map((pokemonItem) => (
			<PokemonItem
				key={pokemonItem.url}
				imageUrl={''}
				name={pokemonItem.name}
				onClick={() => onClickFromPokemonItem(pokemonItem)}
			/>
		));
	}, [pokemonListBySearch]);

	return (
		<>
			<PokemonDialog
				open={pokemonDialogIsOpen}
				pokemonUrl={pokemonItemToShow?.url}
				onClose={onCloseFromPokemonDialog}
			/>

			<styled.Title variant='h1'>Pokedex</styled.Title>

			{searchField}

			<styled.PokemonList>{pokemonItemsToRender}</styled.PokemonList>
		</>
	);
}

export default Home;
