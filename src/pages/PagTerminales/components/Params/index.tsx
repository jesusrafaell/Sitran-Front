/* eslint-disable react-hooks/exhaustive-deps */
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import APTContext from 'context/APTContext';
import { useStyles } from 'pages/PagTerminales/styles';
import { FC, useContext, useLayoutEffect, useState } from 'react';
import DialogCreate from './DialogCreate';
import { useStyles as useStylesP } from './styles';

const Params: FC = () => {
	const classes2 = useStylesP();
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const { prefijos, updatePrefijos } = useContext(APTContext);

	const handleClickOpen = () => {
		setOpen(true);
	};

	let columns = [
		{ headerName: 'ID', field: 'id', type: 'string', width: 40, editable: false },
		{ headerName: 'Valor', field: 'value', type: 'string', width: 50, editable: false },
		{ headerName: 'Tipo Pos', field: 'type_pos', type: 'string', width: 160, editable: false },
		{ headerName: 'Participante', field: 'participant', type: 'string', width: 120, editable: false },
		{ headerName: 'Parent', field: 'parent', type: 'string', width: 160, editable: false },
		{ headerName: 'Organizacion', field: 'org', type: 'string', width: 100, editable: false },
		{ headerName: 'Agregador', field: 'name', type: 'string', width: 160, editable: false },
	];

	const handleClose = () => {
		setOpen(false);
		updatePrefijos();
	};

	useLayoutEffect(() => {
		updatePrefijos();
	}, [open]);

	return (
		<div className={classes.tabWrapper}>
			<Button
				onClick={handleClickOpen}
				sx={{
					textTransform: 'none',
					fontSize: '1rem',
				}}
				className={classes2.createButton}
				variant='contained'
				color='primary'>
				Crear
				<AddCircleIcon style={{ marginLeft: '4px' }} />
			</Button>
			<div style={{ height: 420, width: '100%' }}>
				<DataGrid columns={columns} rows={prefijos} className={classes.tableBackground} />
			</div>
			<DialogCreate open={open} handleClose={handleClose} />
		</div>
	);
};

export default Params;
