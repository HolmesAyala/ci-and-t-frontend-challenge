import { useState, useEffect, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Close from '@mui/icons-material/Close';
import MonitorWeight from '@mui/icons-material/MonitorWeight';
import Height from '@mui/icons-material/Height';
import List from '@mui/icons-material/List';

import PokemonCharacteristic from './components/PokemonCharacteristic';

import * as styled from './styled';

import pokemonPlaceholder from '../../assets/pokemon-placeholder.png';

import { getPokemonDetail, GetPokemonDetailData } from '../../../../api/pokemon/get-pokemon-detail';

export type PokemonDialogProps = {
	open: boolean;
	pokemonUrl?: string;
	onClose?: () => void;
};

function PokemonDialog({ open, pokemonUrl, onClose }: PokemonDialogProps) {
	const [pokemonDetailData, setPokemonDetailData] = useState<GetPokemonDetailData | null>(null);

	const pokemonImageUrl: string = useMemo(
		() =>
			pokemonDetailData?.sprites.other.dream_world.front_default ??
			pokemonDetailData?.sprites.front_default ??
			pokemonPlaceholder,
		[pokemonDetailData]
	);

	const pokemonWeight: string = useMemo(() => {
		if (pokemonDetailData) {
			return `${(pokemonDetailData.weight / 10).toFixed(1)} kg`;
		}

		return '-';
	}, [pokemonDetailData]);

	const pokemonHeight: string = useMemo(() => {
		if (pokemonDetailData) {
			return `${(pokemonDetailData.height / 10).toFixed(1)} m`;
		}

		return '-';
	}, [pokemonDetailData]);

	useEffect(() => {
		const loadPokemonDetailData = async (pokemonUrl: string) => {
			try {
				const pokemonDetailDataLoaded = await getPokemonDetail(pokemonUrl);

				setPokemonDetailData(pokemonDetailDataLoaded);
			} catch (error) {
				console.error(error);
			}
		};

		setPokemonDetailData(null);

		if (pokemonUrl) {
			loadPokemonDetailData(pokemonUrl);
		}
	}, [pokemonUrl]);

	const closeButton: JSX.Element | undefined = onClose ? (
		<IconButton onClick={onClose}>
			<Close />
		</IconButton>
	) : undefined;

	return (
		<Dialog open={open} fullWidth maxWidth='xs' onClose={onClose}>
			<styled.DialogTitleContainer fontWeight='bold'>
				<span>{pokemonDetailData?.name ?? '-'}</span>

				{closeButton}
			</styled.DialogTitleContainer>

			<DialogContent>
				<styled.PokemonImage src={pokemonImageUrl} alt={pokemonDetailData?.name} />

				<styled.Characteristics>
					<PokemonCharacteristic
						icon={<MonitorWeight fontSize='large' />}
						label='Weight'
						value={pokemonWeight}
					/>

					<PokemonCharacteristic
						icon={<Height fontSize='large' />}
						label='Height'
						value={pokemonHeight}
					/>

					<PokemonCharacteristic
						icon={<Typography fontWeight='bold'>XP</Typography>}
						label='Base'
						value={pokemonDetailData?.base_experience ?? '-'}
					/>

					<PokemonCharacteristic
						icon={<List fontSize='large' />}
						label='Order'
						value={pokemonDetailData?.order ?? '-'}
					/>
				</styled.Characteristics>
			</DialogContent>
		</Dialog>
	);
}

export default PokemonDialog;
