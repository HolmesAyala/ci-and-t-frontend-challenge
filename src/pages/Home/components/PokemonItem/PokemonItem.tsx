import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

export type PokemonItemProps = {
	imageUrl: string;
	name: string;
	onClick?: () => void;
};

function PokemonItem({ imageUrl, name, onClick }: PokemonItemProps) {
	return (
		<ListItem disablePadding>
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
