import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import Search from '@mui/icons-material/Search';
import Star from '@mui/icons-material/Star';

import * as styled from './styled';

import PokemonItem from '../../components/PokemonItem';

function Home() {
	return (
		<>
			<styled.Title variant='h1'>Pokedex</styled.Title>

			<styled.Toolbar>
				<TextField
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

				<IconButton>
					<Star />
				</IconButton>
			</styled.Toolbar>

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
