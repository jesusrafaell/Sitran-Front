/* eslint-disable react-hooks/exhaustive-deps */
import { useStyles } from '../styles/styles';
import { Autocomplete, Button, Checkbox, TextField } from '@mui/material';
import { useState } from 'react';
import { seguridad, ViewsGestion } from '../../../services/seguridad';
import SearchIcon from '@mui/icons-material/Search';
import { handleInfoText, handleLoadingSave } from '../../../../../components/swal/alerts';
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid';
import { Agregador } from '../../../interfaces';
import Swal from 'sweetalert2';
import LoaderLine from '../../../../../components/loader/LoaderLine';

interface Props {
	listAgregadores: Agregador[];
}

const EditarVistasByAgregador: React.FC<Props> = ({ listAgregadores }) => {
	const classes = useStyles();

	const [agregador, setAgregador] = useState<Agregador | null>(null);

	const [listViews, setListViews] = useState<ViewsGestion[] | []>([]);

	const [loading, setLoading] = useState(false);

	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: `id`,
			sort: 'asc',
		},
	]);

	const columns: GridColDef[] = [
		{
			field: 'status',
			headerName: 'Estatus',
			width: 200,
			renderCell: (params) => (
				<Checkbox
					checked={params.row.status}
					onChange={() => {
						if (params.row.name === 'Inicio') {
							Swal.fire('Error', `No se puede inactivar: ${params.row.name}`, 'error');
							return;
						} else {
							handleChange(params.row.id);
						}
					}}
				/>
			),
		},
		{
			field: 'name',
			headerName: 'Nombre',
			width: 200,
		},
		{
			field: 'description',
			headerName: 'Descripcion',
			width: 500,
		},
	];

	const handleSaveViews = async () => {
		handleLoadingSave();
		if (agregador && listViews.length) {
			const res = await seguridad.editViewsByAgregador(agregador.id, listViews);
			if (res.ok) {
				handleInfoText('Guardado', `Vistas modificadas en el agregador ${agregador?.name}`);
				setListViews([]);
			}
		}
	};

	const handleChange = (index: number) => {
		listViews.forEach((item, i) => {
			if (item.id === index) {
				listViews[i].status = !listViews[i].status;
			}
		});
	};

	const handleSearchViews = async () => {
		//handleLoadingSearch();
		setLoading(true);
		setListViews([]);
		if (agregador) {
			//console.log('buscar', department?.id);
			const res = await seguridad.getAllListViewsAgregador(agregador.id);
			if (res.ok) {
				if (res.views?.length) {
					setListViews(res.views);
				} else handleInfoText('Vacio', 'No existen vistas disponibles');
			}
			setLoading(false);
		}
	};

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div style={{ width: '400px' }}>
					<div>
						<div className={classes.btn_stepM}>
							<Autocomplete
								sx={{
									mr: 1,
								}}
								className={classes.btn_medio}
								onChange={(event, value) => {
									setListViews([]);
									setAgregador(value ? value : null);
								}}
								options={listAgregadores}
								getOptionLabel={(value: Agregador) => value.name}
								isOptionEqualToValue={(option: Agregador | null, value: any) => option?.id === value.id}
								value={agregador || null}
								renderInput={(params: any) => (
									<TextField {...params} name='rol' label={`Agregador`} variant='outlined' />
								)}
							/>
							<Button
								onClick={handleSearchViews}
								disabled={agregador && !loading ? false : true}
								sx={{
									textTransform: 'none',
									fontSize: '1rem',
								}}
								variant='contained'
								color='primary'
							>
								<SearchIcon />
							</Button>
						</div>
					</div>
				</div>
				<div className={classes.containerStep}>
					{!listViews.length ? (
						loading ? (
							<LoaderLine />
						) : null
					) : (
						<>
							<div style={{ height: 350, width: '100%' }}>
								<DataGrid
									headerHeight={30}
									rowHeight={25}
									columns={columns}
									sortModel={sortModel}
									onSortModelChange={(model) => setSortModel(model)}
									rows={listViews}
									rowsPerPageOptions={[25, 50, 100]}
								/>
							</div>
							<div className={classes.btn_stepM}>
								<Button
									onClick={handleSaveViews}
									disabled={agregador ? false : true}
									sx={{
										mt: '1rem',
										textTransform: 'none',
										fontSize: '1rem',
									}}
									variant='contained'
									color='primary'
								>
									Guardar
								</Button>
							</div>
						</>
					)}
				</div>
			</form>
		</>
	);
};

export default EditarVistasByAgregador;
