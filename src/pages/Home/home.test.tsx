import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Home from './Home';

import * as getPokemonList from '../../api/pokemon/get-pokemon-list/get-pokemon-list';
import { GetPokemonListData } from '../../api/pokemon/get-pokemon-list';

import { pokemonItemMatchSearch } from './utils/pokemon-item-match-search';

const getPokemonListMock = jest.spyOn(getPokemonList, 'getPokemonList');

const getPokemonListDataMockFirstCall: GetPokemonListData = {
	count: 20,
	next: `https://pokeapi.co/api/v2/pokemon?offset=1&limit=1`,
	previous: null,
	results: [
		{
			name: 'bulbasaur',
			url: 'https://pokeapi.co/api/v2/pokemon/1/',
		},
	],
};

const getPokemonListDataMockWithFullData: GetPokemonListData = {
	count: 20,
	next: null,
	previous: null,
	results: [
		{
			name: 'bulbasaur',
			url: 'https://pokeapi.co/api/v2/pokemon/1/',
		},
		{
			name: 'ivysaur',
			url: 'https://pokeapi.co/api/v2/pokemon/2/',
		},
		{
			name: 'venusaur',
			url: 'https://pokeapi.co/api/v2/pokemon/3/',
		},
		{
			name: 'charmander',
			url: 'https://pokeapi.co/api/v2/pokemon/4/',
		},
		{
			name: 'charmeleon',
			url: 'https://pokeapi.co/api/v2/pokemon/5/',
		},
		{
			name: 'charizard',
			url: 'https://pokeapi.co/api/v2/pokemon/6/',
		},
		{
			name: 'squirtle',
			url: 'https://pokeapi.co/api/v2/pokemon/7/',
		},
		{
			name: 'wartortle',
			url: 'https://pokeapi.co/api/v2/pokemon/8/',
		},
		{
			name: 'blastoise',
			url: 'https://pokeapi.co/api/v2/pokemon/9/',
		},
		{
			name: 'caterpie',
			url: 'https://pokeapi.co/api/v2/pokemon/10/',
		},
		{
			name: 'metapod',
			url: 'https://pokeapi.co/api/v2/pokemon/11/',
		},
		{
			name: 'butterfree',
			url: 'https://pokeapi.co/api/v2/pokemon/12/',
		},
		{
			name: 'weedle',
			url: 'https://pokeapi.co/api/v2/pokemon/13/',
		},
		{
			name: 'kakuna',
			url: 'https://pokeapi.co/api/v2/pokemon/14/',
		},
		{
			name: 'beedrill',
			url: 'https://pokeapi.co/api/v2/pokemon/15/',
		},
		{
			name: 'pidgey',
			url: 'https://pokeapi.co/api/v2/pokemon/16/',
		},
		{
			name: 'pidgeotto',
			url: 'https://pokeapi.co/api/v2/pokemon/17/',
		},
		{
			name: 'pidgeot',
			url: 'https://pokeapi.co/api/v2/pokemon/18/',
		},
		{
			name: 'rattata',
			url: 'https://pokeapi.co/api/v2/pokemon/19/',
		},
		{
			name: 'raticate',
			url: 'https://pokeapi.co/api/v2/pokemon/20/',
		},
	],
};

describe('Home', () => {
	beforeEach(() => {
		getPokemonListMock
			.mockResolvedValueOnce(getPokemonListDataMockFirstCall)
			.mockResolvedValueOnce(getPokemonListDataMockWithFullData);
	});

	afterEach(() => {
		getPokemonListMock.mockClear();
	});

	test('Should render pokemon list', async () => {
		render(<Home />);

		await waitFor(() => {
			const pokemonItems = screen.getAllByLabelText('Pokemon item');

			expect(pokemonItems).toHaveLength(getPokemonListDataMockWithFullData.count);
		});
	});

	test('Should filter pokemon by search', async () => {
		render(<Home />);

		const searchField = screen.getByPlaceholderText('Search pokemon by name');

		const searchValue = 'ar';

		userEvent.type(searchField, searchValue);

		const resultsBySearch = getPokemonListDataMockWithFullData.results.filter((pokemonResult) =>
			pokemonItemMatchSearch(pokemonResult, searchValue)
		);

		await waitFor(() => {
			const pokemonNameElements = screen.getAllByLabelText('Pokemon name');

			expect(pokemonNameElements).toHaveLength(resultsBySearch.length);

			pokemonNameElements.forEach((pokemonNameElement, index) => {
				expect(pokemonNameElement).toHaveTextContent(resultsBySearch[index].name);
			});
		});
	});

	test('Should mark pokemon as favorite', async () => {
		render(<Home />);

		await waitFor(() => {
			const pokemonItems = screen.getAllByLabelText('Pokemon item');

			expect(pokemonItems).toHaveLength(getPokemonListDataMockWithFullData.count);
		});

		let [firstFavoriteButton] = screen.getAllByLabelText('Mark pokemon as favorite');

		expect(firstFavoriteButton).toHaveAttribute('aria-pressed', 'false');

		userEvent.click(firstFavoriteButton);

		expect(firstFavoriteButton).toHaveAttribute('aria-pressed', 'true');
	});

	test('Should filter pokemon by favorite', async () => {
		render(<Home />);

		await waitFor(() => {
			const pokemonItems = screen.getAllByLabelText('Pokemon item');

			expect(pokemonItems).toHaveLength(getPokemonListDataMockWithFullData.count);
		});

		let favoriteButtons = screen.getAllByLabelText('Mark pokemon as favorite');

		const pokemonIndexesAsFavorite = [0, 2, 4];

		for (let pokemonIndexAsFavorite of pokemonIndexesAsFavorite) {
			expect(favoriteButtons[pokemonIndexAsFavorite]).toHaveAttribute('aria-pressed', 'false');
		}

		for (let pokemonIndexAsFavorite of pokemonIndexesAsFavorite) {
			userEvent.click(favoriteButtons[pokemonIndexAsFavorite]);
		}

		for (let pokemonIndexAsFavorite of pokemonIndexesAsFavorite) {
			expect(favoriteButtons[pokemonIndexAsFavorite]).toHaveAttribute('aria-pressed', 'true');
		}

		const filterByFavoriteButton = screen.getByLabelText('Filter by favorite');

		expect(filterByFavoriteButton).toHaveAttribute('aria-pressed', 'false');

		userEvent.click(filterByFavoriteButton);

		expect(filterByFavoriteButton).toHaveAttribute('aria-pressed', 'true');

		const pokemonItems = screen.getAllByLabelText('Pokemon item');

		expect(pokemonItems).toHaveLength(pokemonIndexesAsFavorite.length);

		favoriteButtons = screen.getAllByLabelText('Mark pokemon as favorite');

		for (let favoriteButton of favoriteButtons) {
			expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');
		}
	});
});
