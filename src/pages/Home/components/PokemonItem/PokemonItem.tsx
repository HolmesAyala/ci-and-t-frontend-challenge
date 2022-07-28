import * as styled from './styled';

export type PokemonItemProps = {
	imageUrl: string;
	name: string;
};

function PokemonItem({ imageUrl, name }: PokemonItemProps) {
	return (
		<styled.PokemonItem>
			<styled.PokemonImage src={imageUrl} />

			<styled.PokemonName variant='body1' title={name}>
				{name}
			</styled.PokemonName>
		</styled.PokemonItem>
	);
}

export default PokemonItem;
