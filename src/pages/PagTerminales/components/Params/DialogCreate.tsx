import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import APTContext from 'context/APTContext';
import { IPrefijo } from 'interfaces/aptContext';
import { FC, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useStyles } from '../../../PagTerminales/components/Params/styles';

interface IDialogCreate {
	open: boolean;
	handleClose: () => void;
}

const DialogCreate: FC<IDialogCreate> = ({ open, handleClose }) => {
	const classes = useStyles();
	const { createParams } = useContext(APTContext);

	const [loading, setloading] = useState(false);
	// Params Values
	const [value, setvalue] = useState('');
	const [org, setorg] = useState('');
	const [participant, setparticipant] = useState('');
	const [parent, setparent] = useState('');
	const [type_pos, settype_pos] = useState('');
	const [name, setname] = useState('');

	const handleCreateParams = async () => {
		const payload: IPrefijo = {
			value,
			org,
			participant,
			parent,
			type_pos,
			name,
		};

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
					const res: { ok: boolean; value: string } = await createParams(payload);
					if (res.ok) {
						setloading(false);
						handleClose();
						Swal.fire(`Prefijo "${res.value}" creado exitosamente`, '', 'success');
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

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle
				style={{ cursor: 'default', marginBottom: 0 }}
				className={classes.title}
				id='draggable-dialog-title'>
				Crear Prefijo
			</DialogTitle>
			<DialogContent sx={{ overflow: 'visible' }}>
				<form className={classes.fromGrid} noValidate autoComplete='off'>
					{/* Nuevo Parametro */}
					<div className={classes.rowGrid}>
						<>
							<TextField
								disabled={loading}
								// className={classes.btn_medio}
								name='value'
								label='Prefijo'
								onChange={(e) => {
									setvalue(e.target.value);
								}}
								type='text'
								variant='outlined'
								value={value}
							/>
							<TextField
								disabled={loading}
								// className={classes.btn_medio}
								name='org'
								label='Organizacion'
								onChange={(e) => {
									setorg(e.target.value);
								}}
								type='text'
								variant='outlined'
								value={org}
							/>
							<TextField
								disabled={loading}
								// className={classes.btn_medio}
								name='participant'
								label='Participante'
								onChange={(e) => {
									setparticipant(e.target.value);
								}}
								type='text'
								variant='outlined'
								value={participant}
							/>
						</>
						{/* Segunda  Fila */}
						<>
							<TextField
								disabled={loading}
								// className={classes.btn_medio}
								name='parent'
								label='Parent'
								onChange={(e) => {
									setparent(e.target.value);
								}}
								type='text'
								variant='outlined'
								value={parent}
							/>
							<TextField
								disabled={loading}
								// className={classes.btn_medio}
								name='type_pos'
								label='Tipo Pos'
								onChange={(e) => {
									settype_pos(e.target.value);
								}}
								type='text'
								variant='outlined'
								value={type_pos}
							/>
							<TextField
								disabled={loading}
								// className={classes.btn_medio}
								name='name'
								label='Agregador'
								onChange={(e) => {
									setname(e.target.value);
								}}
								type='text'
								variant='outlined'
								value={name}
							/>
						</>
					</div>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button
					onClick={handleCreateParams}
					disabled={loading}
					sx={{
						textTransform: 'none',
						fontSize: '1rem',
					}}
					variant='contained'
					color='primary'>
					Crear
					<AddCircleIcon style={{ marginLeft: '4px' }} />
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DialogCreate;
