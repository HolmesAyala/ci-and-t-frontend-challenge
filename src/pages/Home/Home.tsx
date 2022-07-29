import { useState, useEffect, ChangeEvent, useMemo } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';

import Search from '@mui/icons-material/Search';
import Favorite from '@mui/icons-material/Favorite';

import * as styled from './styled';

import PokemonItem from './components/PokemonItem';
import PokemonDialog from './components/PokemonDialog';

import { getPokemonList, PokemonResult } from '../../api/pokemon/get-pokemon-list';

const DEFAULT_ITEMS_PER_PAGE = 40;

const DEBOUNCE_SEARCH_TIME = 200; // Milliseconds

let debounceSearchTimeout: NodeJS.Timeout;

function Home() {
	// Helper state

	const [pokemonListFromApi, setPokemonListFromApi] = useState<PokemonResult[]>([]);

	const [favoritePokemonMap, setFavoritePokemonMap] = useState<{
		[pokemonUrl: string]: boolean | undefined;
	}>({});

	// Filters

	const [search, setSearch] = useState('');

	const [searchDebounced, setSearchDebounced] = useState('');

	const [filterByFavorite, setFilterByFavorite] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);

	// Lists filtered

	const [pokemonListBySearch, setPokemonListBySearch] = useState<PokemonResult[]>([]);

	const [pokemonListByFavorite, setPokemonListByFavorite] = useState<PokemonResult[]>([]);

	const [pokemonListPaginated, setPokemonListPaginated] = useState<PokemonResult[]>([]);

	// Detail dialog

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

	useEffect(() => {
		const startIndex = (currentPage - 1) * DEFAULT_ITEMS_PER_PAGE;
		const endIndex = startIndex + DEFAULT_ITEMS_PER_PAGE;

		setPokemonListPaginated(pokemonListByFavorite.slice(startIndex, endIndex));
	}, [pokemonListByFavorite, currentPage]);

	const onCloseFromPokemonDialog = () => {
		setPokemonDialogIsOpen(false);
	};

	const onChangeFromSearchField = (event: ChangeEvent<HTMLInputElement>) => {
		const { value: search } = event.target;

		setSearch(search);

		clearInterval(debounceSearchTimeout);

		debounceSearchTimeout = setTimeout(() => {
			setCurrentPage(1);
			setSearchDebounced(search);
		}, DEBOUNCE_SEARCH_TIME);
	};

	const onClickFromFavoriteButtonFilter = () => {
		setCurrentPage(1);
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

	const onChangeFromPagination = (event: ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
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
		return pokemonListPaginated.map((pokemonItem) => (
			<PokemonItem
				key={pokemonItem.url}
				imageUrl={''}
				name={pokemonItem.name}
				isFavorite={Boolean(favoritePokemonMap[pokemonItem.url])}
				onClick={() => onClickFromPokemonItem(pokemonItem)}
				onChangeFavorite={(isFavorite) => onChangeFavoriteFromPokemonItem(pokemonItem, isFavorite)}
			/>
		));
	}, [pokemonListPaginated, favoritePokemonMap]);

	const totalPages = Math.ceil(pokemonListByFavorite.length / DEFAULT_ITEMS_PER_PAGE);

	const pagination: JSX.Element | undefined =
		totalPages > 1 ? (
			<Pagination
				sx={{ my: ({ spacing }) => spacing(3) }}
				color='primary'
				page={currentPage}
				count={Math.ceil(pokemonListByFavorite.length / DEFAULT_ITEMS_PER_PAGE)}
				size='large'
				onChange={onChangeFromPagination}
			/>
		) : undefined;

	return (
		<styled.Home>
			<PokemonDialog
				open={pokemonDialogIsOpen}
				pokemonUrl={pokemonItemToShow?.url}
				onClose={onCloseFromPokemonDialog}
			/>

			<styled.Title variant='h1'>Pokédex</styled.Title>

			<styled.Toolbar>
				{searchField}

				<Tooltip title={<Typography>Filter by favorite</Typography>}>
					<IconButton
						aria-label='Filter by favorite'
						aria-selected={filterByFavorite}
						size='large'
						color={filterByFavorite ? 'primary' : 'default'}
						onClick={onClickFromFavoriteButtonFilter}
					>
						<Favorite />
					</IconButton>
				</Tooltip>
			</styled.Toolbar>

			{pagination}

			<styled.PokemonList>{pokemonItemsToRender}</styled.PokemonList>

			{(searchDebounced.trim() || filterByFavorite) && pokemonItemsToRender.length === 0 ? (
				<styled.EmptyMessage variant='body1'>
					There are no pokemon that match the search criteria.
				</styled.EmptyMessage>
			) : undefined}

			{pagination}
		</styled.Home>
	);
}

export default Home;
