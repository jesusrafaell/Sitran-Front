import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
	fromGrid: {
		display: 'grid',
		gridTemplateColumns: '1fr',
		justifyItems: 'center',
		alignItems: 'center',
		gridRowGap: '1rem',
	},
	rowGrid: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		gridColumnGap: '8px',
		gridRowGap: '12px',
	},
	title: {
		fontSize: '2rem',
		fontWeight: 'bold',
		marginBottom: '1rem',
		color: theme.palette.text.primary,
	},
	createButton: {
		width: '200px',
		position: 'fixed',
		bottom: '1rem',
		right: '45%',
		left: '45%',
	},
	tableBackground: {
		background: theme.palette.background.paper,
	},
}));
