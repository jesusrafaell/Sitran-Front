import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import Finder, { IFinder } from 'components/Finder';
import { FC } from 'react';

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
		fontSize: '1rem',
	},
	tabLabelSelected: {
		fontWeight: 'bolder',
		textTransform: 'none',
		fontSize: '1rem',
	},
	tabWrapper: {
		display: 'grid',
		width: '100%',
		padding: '1rem',
		gridTemplateColumns: '1fr',
		justifyItems: 'center',
		alignItems: 'center',
	},
	tableBackground: {
		background: theme.palette.background.paper,
	},
}));

interface IConsult extends IFinder {
	columns: GridColDef[];
	rowData: any[];
	onCellDoubleClick?: (params: GridCellParams) => void;
}

const Consult: FC<IConsult> = ({
	columns,
	rowData,
	onCellDoubleClick = undefined,
	name,
	valueIn,
	setValueIn,
	actionFunction,
	loading,
	params,
}) => {
	const classes = useStyles();
	return (
		<div className={classes.tabWrapper}>
			<Finder
				valueIn={valueIn}
				setValueIn={setValueIn}
				actionFunction={actionFunction}
				loading={loading}
				params={params}
				name={name}
			/>
			<div style={{ height: 480, width: '100%' }}>
				<DataGrid
					columns={columns}
					rows={rowData}
					className={classes.tableBackground}
					onCellDoubleClick={onCellDoubleClick}
				/>
			</div>
		</div>
	);
};

export default Consult;
