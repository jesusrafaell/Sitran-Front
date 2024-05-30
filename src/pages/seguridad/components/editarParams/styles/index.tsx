import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((styles: Theme) => ({
	editParams: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyItems: 'center',
	},
	wrapperGrid: {
		display: 'grid',
		gridTemplateColumns: '1fr 3fr',
		gridColumnGap: '2rem',
		justifyItems: 'center',
		width: '100%',
		padding: '2rem',
	},
	agregadoresList: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		// justifyItems: 'center',
	},
	wrapper: {
		display: 'grid',
		gridTemplateColumns: '1fr',
		gridRowGap: '1rem',
		justifyItems: 'center',
	},
	textField: {
		margin: 4,
	},
	wrapperParams: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		gridTemplateRows: '0.5fr',
		gridColumnGap: '1.5rem',
		gridRowGap: '1rem',
		alignItems: 'center',
		justifyItems: 'center',
	},
	label: {
		fontSize: 14,
		fontWeight: 600,
		wordBreak: 'keep-all',
	},
	tableHeader: {
		display: 'grid',
		padding: '8px 8px 0',
		alignItems: 'center',
		gridTemplateColumns: ' 1fr',
		justifyItems: 'center',
	},
	tableTitle: {
		fontSize: 14,
		fontWeight: 'bold',
	},
}));
