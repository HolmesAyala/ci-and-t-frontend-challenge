import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

export type PokemonItemProps = {
	imageUrl: string;
	name: string;
};

function PokemonItem({ imageUrl, name }: PokemonItemProps) {
	return (
		<ListItem disablePadding>
			<ListItemButton>
				<ListItemAvatar>
					<Avatar src={imageUrl} alt={name} />
				</ListItemAvatar>

				<ListItemText primary={name} />
			</ListItemButton>
		</ListItem>
	);
}

export default PokemonItem;
