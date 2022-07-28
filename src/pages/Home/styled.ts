import { styled, css } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export const Title = styled(Typography)<TypographyProps>(
	({ theme }) => css`
		font-size: ${theme.typography.h3.fontSize};
		font-weight: ${theme.typography.fontWeightMedium};
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
		grid-template-columns: repeat(auto-fit, 256px);
		gap: ${theme.spacing(2)};
		padding: 0;
	`
);
