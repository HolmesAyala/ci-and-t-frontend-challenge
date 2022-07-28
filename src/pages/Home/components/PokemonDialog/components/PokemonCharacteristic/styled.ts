import { styled, css } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';

export const PokemonCharacteristic = styled('li')(
	({ theme }) => css`
		display: grid;
		grid-template-columns: 64px calc(64px + 32px);
		align-items: center;
		column-gap: ${theme.spacing(1)};
	`
);

export const IconAndLabelContainer = styled('div')(
	({ theme }) => css`
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: ${theme.spacing(1)};
	`
);

export const CharacteristicValue = styled(Typography)<TypographyProps>(
	({ theme }) => css`
		font-size: ${theme.typography.h5.fontSize};
		color: ${theme.palette.success.main};
	`
);
