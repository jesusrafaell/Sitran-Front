import { makeStyles } from '@mui/styles';

export const useStylesCommerce = makeStyles(() => ({
	containerForm: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '1rem',
		padding: '1rem',
		width: '100%',
	},
	containerFM: {
		position: 'relative',
		width: '80%',
		// height: '440px',
	},
	containerLocation: {
		display: 'grid',
		gridColumnGap: '10%',
		gridTemplateColumns: '1fr 1fr',
	},
	buttonNext: {
		textTransform: 'none',
		width: 115,
	},
	textButton: {
		paddingLeft: '10px',
		paddingRight: '10px',
		textTransform: 'none',
		fontSize: '15px',
	},
	buttonBack: {
		textTransform: 'none',
	},
	input: {
		display: 'flex',
		width: '100%',
		margin: '8px 0',
		textAlign: 'center',
		alignItems: 'center',
		// justifyContent: 'center',
	},
	row: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
	},
	grid: {
		width: '100%',
		display: 'grid',
		gridColumnGap: '1%',
		gridTemplateColumns: '1fr 1fr',
	},
	inputSelect: {
		display: 'flex',
		width: '25%',
		textAlign: 'center',
		alignSelf: 'center',
		//marginRight: '2%',
	},
	inputText: {
		width: '100%',
	},
	inputTextLeft: {
		width: '100%',
		marginRight: '2%',
	},
	noBorder: {
		border: 'none',
	},
	imgIdent: {
		padding: '0',
		fontSize: '.7rem',
		textTransform: 'none',
		width: '100%',
		maxWidth: 100,
		maxHeight: 56,
		height: '100%',
	},
	buttonFixed: {
		position: 'fixed',
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		bottom: '2rem',
	},
	labels: {
		maxWidth: 120,
		display: 'flex',
		alignItems: 'center',
	},
	containerBtn: {
		display: 'flex',
		justifyContent: 'center',
	},
	containerCheckBox: {
		display: 'flex',
		justifyContent: 'center',
	},
	daysCB: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		margin: '10px 0',
		fontWeight: 'bold',
	},
	inputSelectSolict: {
		width: '300px',
		marginRight: '1rem',
		textAlign: 'center',
		alignSelf: 'center',
	},
	inputPropIdent: {
		width: '40px',
	},
	newHome: {
		display: 'grid',
		width: '100%',
		gridTemplateColumns: '1fr',
		justifyItems: 'center',
		alignItems: 'center',
	},
	rowGrid: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		gridColumnGap: '8px',
	},
}));
