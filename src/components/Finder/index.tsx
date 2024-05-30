import SearchIcon from '@mui/icons-material/Search';
import { Button, CardActions, CircularProgress, InputAdornment, TextField, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';

export interface IParams {
	size: number;
	exp: RegExp;
}
export interface IFinder {
	valueIn: any;
	setValueIn: React.Dispatch<React.SetStateAction<any>>;
	actionFunction: (e: any) => Promise<void>;
	loading: boolean;
	params: IParams;
	name: string;
}

const useStyles = makeStyles((theme: Theme) => ({
	textField: {
		margin: '8px',
	},
	searchBtn: {
		width: '40px',
		height: 30,
		padding: 0,
		minWidth: 'unset',
		marginRight: 8,
		'& span > div': {
			marginLeft: 0,
		},
	},
	row: {
		// display: 'flex',
		display: 'grid',
		gridTemplateColumns: '3fr 1fr 1fr',
		gridColumnGap: '8px',
		alignItems: 'center',
		justifyContent: 'center',
	},
	loading: {
		marginRight: '1rem',
	},
	button: {
		color: theme.palette.primary.contrastText,
	},
}));

const sxStyled = {
	obtainButton: (theme: Theme) => ({
		background: theme.palette.primary.main,
		borderRadius: '5px',
		textTransform: 'none',
		marginRight: '1rem',
		'*': {
			color: '#fff',
		},
		'&:hover': {
			background: theme.palette.primary.light,
			// color: theme.palette.primary.contrastText,
		},
	}),
};

const Finder: FC<IFinder> = ({ valueIn, setValueIn, actionFunction, loading, params, name }) => {
	const classes = useStyles();
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value: string = event.target.value;
		if (value.length > params.size) return;
		if (params.exp.test(value) || value === '') setValueIn(value);
	};
	return (
		<div className={classes.row}>
			<TextField
				className={classes.textField}
				size='medium'
				variant={'outlined'}
				label={name}
				value={valueIn}
				onKeyPress={actionFunction}
				InputProps={{
					startAdornment: (
						<Button onClick={actionFunction} className={classes.searchBtn}>
							<InputAdornment position={'end'}>
								<SearchIcon />
							</InputAdornment>
						</Button>
					),
				}}
				onChange={handleChange}
			/>
			<CardActions sx={sxStyled.obtainButton}>
				<Button className={classes.button} onClick={() => actionFunction({ key: 'Enter' })}>
					Obtener
				</Button>
			</CardActions>
			{loading && <CircularProgress className={classes.loading} />}
		</div>
	);
};

export default Finder;
