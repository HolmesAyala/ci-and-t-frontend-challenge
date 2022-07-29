import { render, screen, waitFor } from '@testing-library/react';

import Home from './Home';

import * as getPokemonList from '../../api/pokemon/get-pokemon-list/get-pokemon-list';
import { GetPokemonListData } from '../../api/pokemon/get-pokemon-list';

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
	test('Should render pokemon list', async () => {
		const getPokemonListMock = jest.spyOn(getPokemonList, 'getPokemonList');

		getPokemonListMock
			.mockResolvedValueOnce(getPokemonListDataMockFirstCall)
			.mockResolvedValueOnce(getPokemonListDataMockWithFullData);

		render(<Home />);

		await waitFor(() => {
			const pokemonItems = screen.getAllByLabelText('Pokemon item');

			expect(pokemonItems).toHaveLength(getPokemonListDataMockWithFullData.count);
		});
	});
});
