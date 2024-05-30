import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import {
	Button,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from '@mui/material';
import { handleLoading } from 'components/swal/alerts';
import APTContext from 'context/APTContext';
import AuthContext from 'context/auth/AuthContext';
import { IActivacion } from 'interfaces/aptContext';
import { MenuProps, useStyles } from 'pages/PagTerminales/styles';
import { ChangeEvent, FC, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { sxStylesCarga, sxStylesPick, useStyles as useStylesE } from './styles';

const Estatus: FC = () => {
	const classes = useStyles();
	const classes2 = useStylesE();

	const [terminal, setTerminal] = useState('');
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState<number>(1);
	const [data, setData] = useState<IActivacion[]>([]);
	const [file, setFile] = useState<File | null>(null);

	const { cambiarStatusTerminal, cambiarStatusTerminalMasivo } = useContext(APTContext);
	const { user } = useContext(AuthContext);

	const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
		setFile(null);
		if (event?.target?.files && event.target.files[0]) {
			let file_aux: File = event.target.files[0];
			transFile(file_aux);
			setFile(file_aux);
		}
	};

	const transFile = async (filex: File) => {
		const promise = new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsArrayBuffer(filex!);
			fileReader.onload = (e) => {
				if (e.target) {
					const bufferArray = e.target.result;
					const wb = XLSX.read(bufferArray, { type: 'buffer' });
					const wsname = wb.SheetNames[0];
					const ws = wb.Sheets[wsname];
					const data = XLSX.utils.sheet_to_json(ws);
					resolve(data);
				}
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
		await promise.then((d) => {
			// console.log('aquii', d);
			setData(d as IActivacion[]);
		});
	};

	const handleChange = (event: any) => {
		const params = {
			exp: /^\d+((\d*)+)*$/,
			size: 8,
		};
		const { name, value } = event.target;
		switch (name) {
			case 'status':
				setStatus(value);
				return;
			case 'terminal':
				if (value.length > params.size) return;
				if (params.exp.test(value) || value === '') setTerminal(value);
				return;
			default:
				return;
		}
	};

	const handleChangeStatus = () => {
		const payload: IActivacion = {
			terminal,
			estado: status!,
			responsable: user!.name as string,
		};
		Swal.fire({
			title: `¿Deasea colocar como ${status === 1 ? 'Activo' : 'Inactivo'} el terminal ${terminal}?`,
			icon: 'info',
			showDenyButton: true,
			confirmButtonText: 'Si, estoy seguro',
			denyButtonText: 'Cancelar',
			allowOutsideClick: false,
			allowEscapeKey: false,
			customClass: {
				actions: 'my-actions',
				confirmButton: 'order-2',
				denyButton: 'order-3',
			},
		}).then(async (result) => {
			setLoading(true);
			if (result.isConfirmed) {
				try {
					const res: { ok: boolean; Terminal: string } = await cambiarStatusTerminal(payload);
					if (res.ok) {
						setLoading(false);
						Swal.fire(`Terminal ${terminal} cambiara de estado en 10 min aproximadamente.`, '', 'success');
					}
				} catch (error: any) {
					Swal.fire(`Hubo un error al cambiar de estado`, error.response?.data?.message, 'error');
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
		});
	};

	const handleUpFile = async () => {
		setLoading(true);
		if (!file || !data.length) return;
		const payload = { Terminal: data };
		console.log('payload', payload);
		try {
			console.log(payload);
			handleLoading();
			const resp: { Terminales: string[]; message: string } = await cambiarStatusTerminalMasivo(payload);
			console.log('resp', resp);
			Swal.fire({
				icon: 'success',
				title: `Estados de terminales registrados`,
				text: resp.message,
			});
			setLoading(false);
			setFile(null);
			setData([]);
		} catch (error: any) {
			setFile(null);
			setData([]);
			console.log('err', ...error);
			Swal.fire('Error', error?.response?.data?.message || 'error', 'error');
			setLoading(false);
		}
	};

	return (
		<div className={classes.tabWrapper}>
			<>
				<div className={classes2.rowGrid}>
					<FormControl sx={{ m: 1, width: 250 }}>
						<TextField
							// disabled={loading}
							className={classes2.textField}
							name='terminal'
							label='Terminal'
							onChange={handleChange}
							type='text'
							variant='outlined'
							value={terminal}
						/>
					</FormControl>
					<FormControl sx={{ m: 1, width: 250 }}>
						<InputLabel id='estatus'>Estatus</InputLabel>
						<Select
							labelId='Estatus'
							name='status'
							value={status}
							onChange={handleChange}
							renderValue={(s) => (s === 1 ? 'Activo' : 'Inactivo')}
							input={<OutlinedInput label='Estatus' />}
							MenuProps={MenuProps}>
							<MenuItem key={0} value={1}>
								<ListItemText>Activo</ListItemText>
							</MenuItem>
							<MenuItem key={1} value={0}>
								<ListItemText>Inactivo</ListItemText>
							</MenuItem>
						</Select>
					</FormControl>
				</div>
				<Button
					onClick={handleChangeStatus}
					disabled={loading}
					sx={{
						textTransform: 'none',
						fontSize: '1rem',
					}}
					variant='contained'
					color='primary'>
					Cambiar Estatus
					{status === 1 ? (
						<WifiIcon className={classes2.iconButton} />
					) : (
						<WifiOffIcon className={classes2.iconButton} />
					)}
				</Button>
			</>
			{/* Cambiar Estatus Masivo */}
			<>
				<div className={classes2.title}>Cambio Masivo</div>
				<div className={classes2.rowGrid2}>
					<div>
						<p className={classes2.subtitle}>Cargue el archivo de terminales</p>
						{file ? `${file.name}` : ``}
					</div>
					<Button size='small' sx={sxStylesPick} variant={'contained'} component='label'>
						Seleccionar Archivo
						<input type='file' accept='.xlsx, .xls, .csv' hidden onChange={handleFile} />
					</Button>
					<Button
						sx={sxStylesCarga}
						size='small'
						variant='contained'
						onClick={handleUpFile}
						disabled={file ? false : true}>
						Cargar
					</Button>
				</div>
			</>
		</div>
	);
};

export default Estatus;
