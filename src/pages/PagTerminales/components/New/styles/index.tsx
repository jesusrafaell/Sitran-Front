import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
	rowGrid: {
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
}));

export const sxStylesPick = {
	maxWidth: '200px',
	height: '40px',
	marginTop: '1rem',
	textTransform: 'none',
	fontSize: '1rem',
} as const;
export const sxStylesCarga = {
	width: '120px',
	height: '40px',
	marginTop: '1rem',
	textTransform: 'none',
	fontSize: '1rem',
} as const;
