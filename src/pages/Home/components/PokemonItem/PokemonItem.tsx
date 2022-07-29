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
			aria-label='Pokemon item'
			disablePadding
			secondaryAction={
				<IconButton
					aria-label='Mark pokemon as favorite'
					aria-pressed={isFavorite}
					onClick={onClickFromFavoriteButton}
					color={isFavorite ? 'primary' : 'default'}
				>
					{isFavorite ? <Favorite /> : <FavoriteBorder />}
				</IconButton>
			}
		>
			<ListItemButton aria-label='Select pokemon item' onClick={onClick}>
				<ListItemAvatar>
					<Avatar src={imageUrl} alt={name} />
				</ListItemAvatar>

				<ListItemText primary={name} primaryTypographyProps={{ 'aria-label': 'Pokemon name' }} />
			</ListItemButton>
		</ListItem>
	);
}

export default PokemonItem;
