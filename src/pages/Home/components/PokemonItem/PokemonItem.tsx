import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

export type PokemonItemProps = {
	isFavorite?: boolean;
	imageUrl: string;
	name: string;
	onClick?: () => void;
	onChangeFavorite?: (newValue: boolean) => void;
};

function PokemonItem({
	isFavorite = false,
	imageUrl,
	name,
	onClick,
	onChangeFavorite,
}: PokemonItemProps) {
	const onClickFromFavoriteButton = () => {
		if (onChangeFavorite) onChangeFavorite(!isFavorite);
	};

	return (
		<ListItem
			disablePadding
			secondaryAction={
				<IconButton onClick={onClickFromFavoriteButton} color={isFavorite ? 'primary' : 'default'}>
					{isFavorite ? <Favorite /> : <FavoriteBorder />}
				</IconButton>
			}
		>
			<ListItemButton onClick={onClick}>
				<ListItemAvatar>
					<Avatar src={imageUrl} alt={name} />
				</ListItemAvatar>

				<ListItemText primary={name} />
			</ListItemButton>
		</ListItem>
	);
}

export default PokemonItem;
