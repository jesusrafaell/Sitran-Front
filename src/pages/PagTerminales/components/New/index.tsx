/* eslint-disable react-hooks/exhaustive-deps */
import AddCircleIcon from '@mui/icons-material/AddCircle';
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
import { ITerminal, ITerminalM } from 'interfaces/aptContext';
import { MenuProps, useStyles } from 'pages/PagTerminales/styles';
import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { sxStylesCarga, sxStylesPick, useStyles as useStylesN } from './styles';

const New: FC = () => {
	const classes = useStyles();
	const classes2 = useStylesN();

	const [loading, setloading] = useState(false);
	//Terminal Data
	const [newPref, setnewPref] = useState(0);
	const [newCant, setnewCant] = useState(1);
	const [newAfiliado, setnewAfiliado] = useState(0);
	const [data, setData] = useState<ITerminal[]>([]);
	const [file, setFile] = useState<File | null>(null);

	const { prefijos, createTerminal, createTerminalMasivo, obtenerAfiliados, afiliados } = useContext(APTContext);

	const handleSelectedPref = (value: number) => {
		const pref = prefijos.filter((pre) => pre.id === value)[0];
		if (!pref) return ``;
		return `${pref.value} - ${pref.org} - ${pref.name}`;
	};
	const handleSelectedAfi = (value: number) => {
		const afi = afiliados.filter((pre, i) => i === value)[0];
		if (!afi) return ``;
		return `${afi.afiCod.slice(6)}`;
	};

	const handleChange = (event: any) => {
		const {
			target: { value, name },
		} = event;
		switch (name) {
			case 'prefijo':
				setnewPref(value);
				break;
			case 'cantidad':
				if (value !== '' && value <= 0) return;
				setnewCant(value);
				break;
			case 'afiliado':
				setnewAfiliado(value);
				break;
		}
	};

	const handleCreateTerminal = () => {
		const pref = prefijos.filter((pre) => pre.id === newPref)[0];
		const afi = afiliados.filter((afi, i) => i === newAfiliado)[0].afiCod.slice(6);
		const payload: ITerminal = {
			afiliado: afi,
			cantidad: newCant,
			prefijo: pref.value,
		};

		Swal.fire({
			title: `¿Esta seguro de crear ${newCant > 1 ? `${newCant} terminales` : `${newCant} terminal`} con prefijo ${
				pref.value
			} y afiliado ${afi}?`,
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
			setloading(true);
			if (result.isConfirmed) {
				try {
					const res: { ok: boolean; Terminal: string } = await createTerminal(payload);
					if (res.ok) {
						setloading(false);
						Swal.fire(`Terminal/es "${res.Terminal[0]}" creado exitosamente`, '', 'success');
					}
				} catch (error: any) {
					Swal.fire(`Hubo un error al crear`, error.response?.data?.message, 'error');
					setloading(false);
				}
			} else {
				setloading(false);
			}
		});
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
			setData(d as ITerminal[]);
		});
	};

	const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
		setFile(null);
		if (event?.target?.files && event.target.files[0]) {
			let file_aux: File = event.target.files[0];
			transFile(file_aux);
			setFile(file_aux);
		}
	};

	const handleUpFile = async () => {
		setloading(true);
		if (!file || !data.length) return;
		// console.log('aca', file, data);
		const payload: ITerminalM = { Terminal: data };
		try {
			// console.log(payload);
			handleLoading();
			const resp: { Terminales: string[]; message: string } = await createTerminalMasivo(payload);
			// console.log('resp', resp);
			Swal.fire({
				icon: 'success',
				title: `Terminales: ${resp.Terminales.join(', ')}`,
				text: resp.message,
			});
			setloading(false);
			setFile(null);
			setData([]);
		} catch (error: any) {
			setFile(null);
			setData([]);
			console.log('err', ...error);
			Swal.fire('Error', error?.response?.data?.message || 'error', 'error');
			setloading(false);
		}
	};

	const handleAfiliadosList = async (org: any) => {
		await obtenerAfiliados(org);
	};

	useEffect(() => {
		handleAfiliadosList(newPref);
	}, [newPref]);

	return (
		<div className={classes.tabWrapper}>
			<>
				<div className={classes2.rowGrid}>
					<>
						<FormControl sx={{ m: 1, width: 250 }}>
							<InputLabel id='prefijos-tag'>Prefijos</InputLabel>
							<Select
								labelId='Prefijos'
								name='prefijo'
								value={newPref}
								onChange={handleChange}
								input={<OutlinedInput label='Prefijos' />}
								renderValue={handleSelectedPref}
								MenuProps={MenuProps}
							>
								{prefijos.map((pref) => (
									<MenuItem key={pref.id} value={pref.id}>
										<ListItemText>
											{pref.value} - {pref.org} - {pref.name}
										</ListItemText>
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl>
							<TextField
								// disabled={loading}
								// className={classes2.btn_medio}
								name='cantidad'
								label='Cantidad'
								onChange={handleChange}
								type='number'
								variant='outlined'
								value={newCant}
							/>
						</FormControl>

						<FormControl sx={{ m: 1, width: 250 }}>
							<InputLabel id='Afiliado-tag'>Afiliado</InputLabel>
							<Select
								labelId='Afiliado'
								name='afiliado'
								value={newAfiliado}
								onChange={handleChange}
								input={<OutlinedInput label='Afiliado' />}
								renderValue={handleSelectedAfi}
								MenuProps={MenuProps}
							>
								{afiliados.map((afi, i) => (
									<MenuItem key={i} value={i}>
										<ListItemText>{afi.afiCod.slice(6)}</ListItemText>
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</>
				</div>
				<Button
					onClick={handleCreateTerminal}
					disabled={loading}
					sx={{
						textTransform: 'none',
						fontSize: '1rem',
					}}
					variant='contained'
					color='primary'
				>
					Crear Terminal
					<AddCircleIcon style={{ marginLeft: '4px' }} />
				</Button>
			</>
			<>
				<div className={classes2.title}>Crear Masivo</div>
				<div className={classes2.rowGrid}>
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
						disabled={file ? false : true}
					>
						Cargar
					</Button>
				</div>
			</>
		</div>
	);
};

export default New;
