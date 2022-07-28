import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';

import * as styled from './styled';

export type PokemonCharacteristicProps = {
	icon?: ReactNode;
	label?: ReactNode;
	value?: ReactNode;
};

function PokemonCharacteristic({ icon, label, value }: PokemonCharacteristicProps) {
	return (
		<styled.PokemonCharacteristic>
			<styled.IconAndLabelContainer>
				{icon}

				<Typography>{label}</Typography>
			</styled.IconAndLabelContainer>

			<styled.CharacteristicValue variant='body1'>{value}</styled.CharacteristicValue>
		</styled.PokemonCharacteristic>
	);
}

export default PokemonCharacteristic;
