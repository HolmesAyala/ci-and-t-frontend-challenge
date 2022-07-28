import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import Search from '@mui/icons-material/Search';
import Star from '@mui/icons-material/Star';

import * as styled from './styled';

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
		</>
	);
}

export default Home;
