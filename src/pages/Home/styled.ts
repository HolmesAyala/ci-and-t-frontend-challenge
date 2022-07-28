import { styled, css } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';

export const Title = styled(Typography)<TypographyProps>(
	({ theme }) => css`
		font-size: ${theme.typography.h3.fontSize};
		font-weight: ${theme.typography.fontWeightMedium};
	`
);

export const Toolbar = styled('div')(
	({ theme }) => css`
		display: grid;
		grid-template-columns: 1fr 56px;
		margin: ${theme.spacing(3)} 0;
		column-gap: ${theme.spacing(2)};
	`
);

export const PokemonList = styled('div')(
	({ theme }) => css`
		display: grid;
		grid-template-columns: repeat(auto-fit, 192px);
		gap: ${theme.spacing(2)};
	`
);
