import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import useAxios from 'config';
import { FC, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useStyles } from '../../../PagTerminales/components/Params/styles';
import { ITerminal } from './Consulta';

interface IDialogCreate {
	open: boolean;
	handleClose: () => void;
	handleGetData: () => void;
	term: ITerminal | null;
}

const EditTerminal: FC<IDialogCreate> = ({ open, handleClose, handleGetData, term }) => {
	const classes = useStyles();
	const [nroCuenta, setNroCuenta] = useState<string>(term?.aboNroCuenta!);

	const expCI: RegExp = /^[0-9]{0,20}$/;

	const [ready, setReady] = useState(true);

	useEffect(() => {
		if (nroCuenta.length !== 20) setReady(true);
		else setReady(false);
	}, [nroCuenta]);

	const [loading, setloading] = useState(false);

	const handleCreateParams = async () => {
		if (!term) return;
		Swal.fire({
			title: '¿Esta seguro de crear el nuevo prefijo?',
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
				htmlContainer: 'z-index: 3',
			},
		}).then(async (result) => {
			setloading(true);
			if (result.isConfirmed) {
				try {
					const res = await useAxios.put(`/aboterminal/${term.id}`, { aboNroCuenta: nroCuenta });
					setloading(false);
					handleGetData();
					handleClose();
					Swal.fire(`Nro de cuenta del terminal "${term.id}" editado`, `${res.data.message}`, 'success');
				} catch (error: any) {
					Swal.fire(`Hubo un error al crear`, error.response?.data?.message, 'error');
					setloading(false);
				}
			} else {
				setloading(false);
			}
		});
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle
				style={{ cursor: 'default', marginBottom: 0 }}
				className={classes.title}
				id='draggable-dialog-title'
			>
				Terminal: {term?.id}
			</DialogTitle>
			<DialogContent sx={{ overflow: 'visible' }}>
				<form className={classes.fromGrid} noValidate autoComplete='off'>
					<TextField
						disabled={loading}
						// className={classes.btn_medio}
						label='Nro Cuenta'
						onChange={(e) => {
							if (expCI.test(e.target.value as string)) {
								setNroCuenta(e.target.value);
							}
						}}
						name='aboNroCuenta'
						defaultValue={term?.aboNroCuenta}
						value={nroCuenta}
						type='text'
						variant='outlined'
					/>
					<div className={classes.rowGrid}>
						<></>
					</div>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button
					onClick={handleCreateParams}
					disabled={loading || ready}
					sx={{
						textTransform: 'none',
						fontSize: '1rem',
					}}
					variant='contained'
					color='primary'
				>
					Editar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditTerminal;
