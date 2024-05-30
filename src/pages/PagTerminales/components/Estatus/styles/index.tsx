import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
	newStatus: {
		display: 'grid',
		width: '100%',
		padding: '1rem',
		gridTemplateColumns: '1fr',
		justifyItems: 'center',
		alignItems: 'center',
	},
	rowGrid: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gridColumnGap: '8px',
		gridRowGap: '12px',
		alignItems: 'center',
		justifyItems: 'center',
	},
	rowGrid2: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		gridColumnGap: '8px',
		gridRowGap: '12px',
		alignItems: 'center',
		justifyItems: 'center',
	},
	title: {
		fontSize: '2rem',
		fontWeight: 'bold',
		margin: '1rem 0',
		color: theme.palette.text.primary,
	},
	subtitle: {
		color: theme.palette.text.primary,
		fontWeight: 'bold ',
		marginBottom: '8px',
	},
	textField: {
		width: '100%',
	},
	iconButton: {
		marginLeft: '8px',
	},
}));

export const sxStylesPick = {
	maxWidth: '240px',
	height: '40px',
	marginTop: '1rem',
} as const;
export const sxStylesCarga = {
	width: '120px',
	height: '40px',
	marginTop: '1rem',
} as const;
