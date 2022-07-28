import { styled, css } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export const PokemonItem = styled(Paper)(() => css``);

export const PokemonImage = styled('img')(
	() => css`
		width: 192px;
		height: 192px;
		object-fit: cover;
		box-sizing: border-box;
		overflow: hidden;
	`
);

export const PokemonName = styled(Typography)(
	({ theme }) => css`
		text-align: center;
		font-weight: ${theme.typography.fontWeightBold};
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding: ${theme.spacing(1)};
	`
);
