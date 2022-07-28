import { styled, css } from '@mui/material/styles';
import MuiDialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';

export const DialogTitleContainer = styled(MuiDialogTitle)<DialogTitleProps>(
	() => css`
		display: flex;
		justify-content: space-between;
	`
);

export const PokemonImage = styled('img')(
	() => css`
		width: 256px;
		height: 256px;
		object-fit: contain;
		overflow: hidden;
		margin: 0 auto;
		display: block;
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
