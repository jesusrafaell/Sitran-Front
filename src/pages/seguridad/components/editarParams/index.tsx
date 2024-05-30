/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Checkbox, FormLabel, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridSortModel, GridToolbarContainer } from '@mui/x-data-grid';
import { handleLoadingSave } from 'components/swal/alerts';
import AgregadorContext from 'context/AgregadorContext';
import { IAgregador } from 'interfaces/agregadorContext';
import { Params } from 'pages/seguridad/interfaces';
import { seguridad } from 'pages/seguridad/services/seguridad';
import { ChangeEvent, useContext, useLayoutEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useStyles } from './styles';

interface Props {}

const EditarParams: React.FC<Props> = () => {
	const classes = useStyles();
	const [listAgrUpdate, setlistAgrUpdate] = useState<IAgregador[]>([]);
	const [listParams, setlistParams] = useState<Params[]>([]);
	const { ListaAgregadores, setListaAgregadores } = useContext(AgregadorContext);

	const [update, setUpdate] = useState(false);

	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: `view['id']`,
			sort: 'asc',
		},
	]);

	const handleChange = (index: number) => {
		const listUpdated = ListaAgregadores.map((agr) => {
			const { id, active, ...rest } = agr;
			if (id === index) {
				return { id, ...rest, active: active === 1 ? 0 : 1 } as IAgregador;
			}
			return agr;
		});
		setlistAgrUpdate(listUpdated);
		setListaAgregadores(listUpdated);
	};

	const handleParamChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value: valueT } = event.target;
		const namekey = name.split(',');
		const nameCh = namekey[0];
		const keyCh = namekey[1];
		const updListParam = listParams.map((param) => {
			const { id, name, key, value, ...rest } = param;
			if (param.name === nameCh && param.key === keyCh) {
				return { id, key, name, ...rest, value: valueT };
			}
			return param;
		});
		setlistParams(updListParam);
	};

	const columns: GridColDef[] = [
		{
			field: 'active',
			headerName: 'Activo',
			width: 100,
			renderCell: (params) => (
				<Checkbox
					checked={params.row.active ? true : false}
					onChange={() => {
						handleChange(params.row.id);
					}}
				/>
			),
		},
		{
			field: 'name',
			headerName: 'Nombre',
			type: 'string',
			width: 150,
		},
		// {
		// 	field: 'key',
		// 	headerName: 'Key',
		// 	type: 'string',
		// 	width: 100,
		// },
	];

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className={classes.tableHeader}>
				<div className={classes.tableTitle}>Activar/Desactivar Agregadores</div>
			</GridToolbarContainer>
		);
	};

	const handlesUpdateAgrStatus = async () => {
		setUpdate(true);
		handleLoadingSave();
		setUpdate(false);
	};

	const handleButtonAgr = async () => {
		Swal.fire({
			title: 'Confirmar cambios',
			icon: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Guardar',
			showCancelButton: true,
			cancelButtonText: 'Atras',
			showCloseButton: true,
			customClass: { container: 'swal2-validated' },
		}).then((result) => {
			if (result.isConfirmed) {
				handlesUpdateAgrStatus();
			}
		});
	};

	const handleButtonParams = async () => {
		Swal.fire({
			title: 'Confirmar cambios',
			icon: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Guardar',
			showCancelButton: true,
			cancelButtonText: 'Atras',
			showCloseButton: true,
			customClass: { container: 'swal2-validated' },
		}).then((result) => {
			if (result.isConfirmed) {
				handlesUpdateAgrStatus();
			}
		});
	};

	useLayoutEffect(() => {
		const getData = async () => {
			const res = await seguridad.getAllListParams();
			setlistParams(res.params);
		};
		getData();
		console.log('listAgrUpdate', listAgrUpdate);
	}, []);

	return (
		<>
			<div className={classes.editParams}>
				<div className={classes.wrapperGrid}>
					<div className={classes.wrapper}>
						<div style={{ width: 300, height: '40vh' }}>
							<DataGrid
								components={{
									Toolbar: customToolbar,
								}}
								headerHeight={35}
								rowHeight={25}
								columns={columns}
								hideFooter
								sortModel={sortModel}
								onSortModelChange={(model) => setSortModel(model)}
								rows={ListaAgregadores}
							/>
						</div>
						<Button
							onClick={handleButtonAgr}
							disabled={update}
							sx={{
								mt: '1rem',
								textTransform: 'none',
								fontSize: '1rem',
								width: '100%',
							}}
							variant='contained'
							color='primary'>
							Guardar
						</Button>
					</div>
					<div className={classes.wrapper}>
						<div className={classes.wrapperParams}>
							{listParams.map((param) => (
								<div className={classes.agregadoresList}>
									<FormLabel className={classes.label}>{param.description}</FormLabel>
									<TextField
										className={classes.textField}
										size='medium'
										variant={'outlined'}
										name={param.name + ',' + param.key}
										// label={param.name}
										value={param.value}
										// onKeyPress={actionFunction}
										onChange={handleParamChange}
									/>
								</div>
							))}
						</div>
						<Button
							onClick={handleButtonParams}
							disabled={update}
							sx={{
								mt: '1rem',
								textTransform: 'none',
								fontSize: '1rem',
								maxHeight: '40px',
								maxWidth: '300px',
								width: '100%',
							}}
							variant='contained'
							color='primary'>
							Guardar
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditarParams;
