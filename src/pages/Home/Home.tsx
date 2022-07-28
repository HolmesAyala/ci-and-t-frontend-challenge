import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

import * as styled from './styled';

import PokemonItem from './components/PokemonItem';

function Home() {
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

			<styled.PokemonList>
				<PokemonItem
					imageUrl='https://raw.githubusercontent.com/PokeAPI/sprites/75569c97b9d26c2103f6c3d75772fabe755bbd1e/sprites/pokemon/other/dream-world/10.svg'
					name='Some name'
				/>

				<PokemonItem
					imageUrl='https://raw.githubusercontent.com/PokeAPI/sprites/75569c97b9d26c2103f6c3d75772fabe755bbd1e/sprites/pokemon/other/dream-world/10.svg'
					name='Other name very very long'
				/>
			</styled.PokemonList>
		</>
	);
}

export default Home;
