import { styled, css } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export const Home = styled('div')(
	() => css`
		max-width: 1280px;
		margin: 0 auto;
	`
);

export const PokemonIcon = styled('img')(
	({ theme }) => css`
		width: 64px;
		height: 64px;
		object-fit: contain;
		margin-right: ${theme.spacing(2)};
	`
);

export const Title = styled(Typography)<TypographyProps>(
	({ theme }) => css`
		font-size: ${theme.typography.h3.fontSize};
		font-weight: ${theme.typography.fontWeightBold};
		padding: ${theme.spacing(2)};
		color: ${theme.palette.primary.main};
		display: flex;
		align-items: center;
	`
);

export const Toolbar = styled('div')(
	({ theme }) => css`
		top: 0;
		position: sticky;
		padding: ${theme.spacing(2)};
		display: grid;
		grid-template-columns: 1fr 56px;
		column-gap: ${theme.spacing(2)};
		background-color: white;
		z-index: ${theme.zIndex.appBar};
		border-bottom: 1px solid ${theme.palette.grey[100]};
	`
);

export const SearchField = styled(TextField)<TextFieldProps>(
	({ theme }) => css`
		margin: ${theme.spacing(3)} 0;
	`
);

export const PokemonList = styled('ul')(
	({ theme }) => css`
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
		gap: ${theme.spacing(2)};
		padding: 0;
	`
);

export const EmptyMessage = styled(Typography)<TypographyProps>(
	({ theme }) => css`
		padding: ${theme.spacing(2)};
		text-align: center;
		background-color: ${theme.palette.grey[200]};
		border-radius: 4px;
	`
);
