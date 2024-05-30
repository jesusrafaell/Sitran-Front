import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		padding: '0 2rem',
	},
	tabPanel: {
		padding: '0 16px 0',
		// width: '100%',
		height: '100%',
	},
	tabLabel: {
		textTransform: 'none',
		fontSize: '0.85rem',
	},
	tabLabelSelected: {
		fontWeight: 'bolder',
		textTransform: 'none',
		fontSize: '0.85rem',
	},
}));

export const sxStyled = {
	tabName: {
		textTransform: 'none',
		fontSize: '1rem',
	},
	closeBtn: (styles: Theme) => ({
		width: 40,
		height: 40,
		position: 'absolute',
		top: 0,
		right: 0,
		padding: 0,
		minWidth: 'unset',
		borderRadius: '50%',
		color: styles.palette.error.main,
	}),
	blockedButtonOn: (styles: Theme) => ({
		fontWeight: 'bold',
		backgroundColor: styles.palette.success.light,
		color: styles.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${styles.palette.success.main} !important`,
		},
	}),
	blockedButtonOff: (styles: Theme) => ({
		fontWeight: 'bold',
		backgroundColor: styles.palette.error.light,
		color: styles.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${styles.palette.error.main} !important`,
		},
	}),
	avatarLetter: (styles: Theme) => ({
		textTransform: 'uppercase',
		backgroundColor: styles.palette.primary.light,
		fontSize: 56,
	}),
	buttonSaveData: (styles: Theme) => ({
		backgroundColor: styles.palette.primary.light,
		color: styles.palette.common.white,
		'&:hover': {
			backgroundColor: styles.palette.primary.main,
		},
	}),
};
