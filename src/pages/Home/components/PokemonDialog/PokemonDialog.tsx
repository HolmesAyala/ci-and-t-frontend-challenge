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
import StatsChart, { StatItem } from './components/StatsChart';

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

	const [chartStats, setChartStats] = useState<StatItem[]>([]);

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

				setChartStats(
					pokemonDetailDataLoaded.stats.map((statItem) => ({
						stat: statItem.stat.name,
						value: statItem.base_stat,
					}))
				);
			} catch (error) {
				console.error(error);
			}
		};

		setPokemonDetailData(null);
		setChartStats([]);

		if (pokemonUrl) {
			loadPokemonDetailData(pokemonUrl);
		}
	}, [pokemonUrl]);

	const closeButton: JSX.Element | undefined = onClose ? (
		<IconButton aria-label='Close dialog' onClick={onClose}>
			<Close />
		</IconButton>
	) : undefined;

	return (
		<Dialog
			aria-label='Pokemon description dialog'
			open={open}
			fullWidth
			maxWidth='sm'
			onClose={onClose}
		>
			<styled.DialogTitleContainer fontWeight='bold'>
				<span>{pokemonDetailData?.name ?? '-'}</span>

				{closeButton}
			</styled.DialogTitleContainer>

			<DialogContent>
				<styled.PokemonImage src={pokemonImageUrl} alt={pokemonDetailData?.name} />

				<styled.SectionTitle variant='h3'>Characteristics</styled.SectionTitle>

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

				<styled.SectionTitle variant='h3'>Stats</styled.SectionTitle>

				<StatsChart id='stats-chart' stats={chartStats} />
			</DialogContent>
		</Dialog>
	);
}

export default PokemonDialog;
