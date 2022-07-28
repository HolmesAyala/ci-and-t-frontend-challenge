import { useState, useEffect, ChangeEvent, useMemo } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import Search from '@mui/icons-material/Search';
import Favorite from '@mui/icons-material/Favorite';

import * as styled from './styled';

import PokemonItem from './components/PokemonItem';
import PokemonDialog from './components/PokemonDialog';

import { getPokemonList, PokemonResult } from '../../api/pokemon/get-pokemon-list';

const DEBOUNCE_SEARCH_TIME: number = 200; // Milliseconds

let debounceSearchTimeout: NodeJS.Timeout;

function Home() {
	const [pokemonListFromApi, setPokemonListFromApi] = useState<PokemonResult[]>([]);

	const [favoritePokemonMap, setFavoritePokemonMap] = useState<{
		[pokemonUrl: string]: boolean | undefined;
	}>({});

	const [search, setSearch] = useState('');

	const [searchDebounced, setSearchDebounced] = useState('');

	const [filterByFavorite, setFilterByFavorite] = useState(false);

	const [pokemonListBySearch, setPokemonListBySearch] = useState<PokemonResult[]>([]);

	const [pokemonListByFavorite, setPokemonListByFavorite] = useState<PokemonResult[]>([]);

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
		if (!searchDebounced.trim()) {
			setPokemonListBySearch(pokemonListFromApi);
		} else {
			setPokemonListBySearch(
				pokemonListFromApi.filter((pokemonItem) =>
					pokemonItem.name.toLowerCase().includes(searchDebounced.trim().toLowerCase())
				)
			);
		}
	}, [pokemonListFromApi, searchDebounced]);

	useEffect(() => {
		if (!filterByFavorite) {
			setPokemonListByFavorite(pokemonListBySearch);
		} else {
			setPokemonListByFavorite(
				pokemonListBySearch.filter((pokemonItem) => Boolean(favoritePokemonMap[pokemonItem.url]))
			);
		}
	}, [pokemonListBySearch, filterByFavorite, favoritePokemonMap]);

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

	const onClickFromFavoriteButtonFilter = () => {
		setFilterByFavorite((currentValue) => !currentValue);
	};

	const onClickFromPokemonItem = (pokemonItem: PokemonResult) => {
		setPokemonItemToShow(pokemonItem);
		setPokemonDialogIsOpen(true);
	};

	const onChangeFavoriteFromPokemonItem = (pokemonItem: PokemonResult, isFavorite: boolean) => {
		setFavoritePokemonMap((currentValue) => {
			return {
				...currentValue,
				[pokemonItem.url]: isFavorite,
			};
		});
	};

	const searchField: JSX.Element = (
		<TextField
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
		return pokemonListByFavorite.map((pokemonItem) => (
			<PokemonItem
				key={pokemonItem.url}
				imageUrl={''}
				name={pokemonItem.name}
				isFavorite={Boolean(favoritePokemonMap[pokemonItem.url])}
				onClick={() => onClickFromPokemonItem(pokemonItem)}
				onChangeFavorite={(isFavorite) => onChangeFavoriteFromPokemonItem(pokemonItem, isFavorite)}
			/>
		));
	}, [pokemonListByFavorite, favoritePokemonMap]);

	return (
		<styled.Home>
			<PokemonDialog
				open={pokemonDialogIsOpen}
				pokemonUrl={pokemonItemToShow?.url}
				onClose={onCloseFromPokemonDialog}
			/>

			<styled.Title variant='h1'>Pokedex</styled.Title>

			<styled.Toolbar>
				{searchField}

				<IconButton
					size='large'
					color={filterByFavorite ? 'primary' : 'default'}
					onClick={onClickFromFavoriteButtonFilter}
				>
					<Favorite />
				</IconButton>
			</styled.Toolbar>

			<styled.PokemonList>{pokemonItemsToRender}</styled.PokemonList>
		</styled.Home>
	);
}

export default Home;
