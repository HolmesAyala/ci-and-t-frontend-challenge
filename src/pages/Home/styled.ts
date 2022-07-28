import { styled, css } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';

export const Title = styled(Typography)<TypographyProps>(
	({ theme }) => css`
		font-size: ${theme.typography.h3.fontSize};
		font-weight: ${theme.typography.fontWeightMedium};
	`
);
