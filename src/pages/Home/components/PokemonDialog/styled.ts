import { styled, css } from '@mui/material/styles';
import MuiDialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import Typography, { TypographyProps } from '@mui/material/Typography';

export const DialogTitleContainer = styled(MuiDialogTitle)<DialogTitleProps>(
	() => css`
		display: flex;
		justify-content: space-between;
	`
);

export const PokemonImage = styled('img')(
	() => css`
		display: block;
		width: 256px;
		height: 256px;
		object-fit: contain;
		overflow: hidden;
		margin: 0 auto;
	`
);

export const SectionTitle = styled(Typography)<TypographyProps>(
	({ theme }) => css`
		font-size: ${theme.typography.h5.fontSize};
		margin: ${theme.spacing(3)} 0;
	`
);

export const Characteristics = styled('ul')(
	({ theme }) => css`
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: ${theme.spacing(2)};
		margin: ${theme.spacing(2)} 0 0 0;

		${theme.breakpoints.down('sm')} {
			grid-template-columns: 1fr;
		}
	`
);
