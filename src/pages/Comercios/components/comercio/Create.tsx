import { joiResolver } from '@hookform/resolvers/joi';
import { Button, Checkbox, FormControlLabel, FormGroup, FormLabel, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Joi from 'joi';
import { useForm } from 'react-hook-form';

import useAxios from '../../../../config';

import { FC, useEffect, useLayoutEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useStylesCommerce } from '../styles';

type FormValues = {
	commerce: {
		comerRif: string;
		idActivityXAfiliado: string;
		comerDesc: string;
		//comerCuentaBanco: string;
		comerCodTipoCont: boolean;
		locationCommerce: {
			estado: string;
			municipio: string;
			ciudad: string;
			parroquia: string;
			casa: string;
		};
		daysOperacion: {
			Lun: boolean;
			Mar: boolean;
			Mie: boolean;
			Jue: boolean;
			Vie: boolean;
			Sab: boolean;
			Dom: boolean;
		};
	};
	contacto: {
		contNombres: string;
		contApellidos: string;
		contTelefLoc: string;
		contTelefMov: string;
		contMail: string;
	};
};

const expCI: RegExp = /^[V|E|J|P][0-9]{5,9}$/;

const expNroCuenta: RegExp = /^[0-9]{0,20}$/;

const schema = Joi.object({
	commerce: {
		comerRif: Joi.string().min(8).max(10).required().regex(expCI),
		idActivityXAfiliado: Joi.string().required(),
		comerDesc: Joi.string().required(),
		//comerCuentaBanco: Joi.string().required().length(20),
		comerCodTipoCont: Joi.boolean(),
		locationCommerce: {
			estado: Joi.string().required(),
			municipio: Joi.string().required(),
			ciudad: Joi.string().required(),
			parroquia: Joi.string().required(),
			casa: Joi.string().required(),
		},
		daysOperacion: {
			Lun: Joi.boolean(),
			Mar: Joi.boolean(),
			Mie: Joi.boolean(),
			Jue: Joi.boolean(),
			Vie: Joi.boolean(),
			Sab: Joi.boolean(),
			Dom: Joi.boolean(),
		},
	},
	contacto: {
		contNombres: Joi.string().required().min(2),
		contApellidos: Joi.string().required(),
		contTelefLoc: Joi.string().required().min(11),
		contTelefMov: Joi.string().required().min(11),
		contMail: Joi.string()
			.required()
			.email({ tlds: { allow: false } }),
	},
});

const NewCommerce: FC = () => {
	const classes = useStylesCommerce();
	const {
		register,
		handleSubmit,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		formState: { errors },
	} = useForm<FormValues>({ resolver: joiResolver(schema) });

	const [loading, setloading] = useState(false);
	const [ready, setReady] = useState(true);
	const [afiliados, setAfiliados] = useState([]);
	const [afiliado, setAfiliado] = useState(null);
	const [comerCuentaBanco, setComerCuentaBanco] = useState<string>('');

	useEffect(() => {
		if (!afiliado || comerCuentaBanco.length !== 20) setReady(true);
		else setReady(false);
	}, [afiliado, comerCuentaBanco]);

	// console.log(errors);

	useLayoutEffect(() => {
		const init = async () => {
			const res: any = await useAxios.get('/afiliados/all');
			// console.log(res);
			if (res.data.info.length) {
				setAfiliados(res.data.info);
			}
		};
		if (!afiliados.length) {
			init();
		}
	}, [afiliados]);

	// console.log(afiliados);

	const onSubmit = (data: any) => {
		Swal.fire({
			title: `¿Esta seguro de crear el comercio ?`,
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
					data.commerce.comerCuentaBanco = comerCuentaBanco;
					await useAxios.post('/comercios/create', data);
					// console.log(res);
					setloading(false);
					Swal.fire(`Comercio "${data.commerce.comerRif}" creado exitosamente`, '', 'success');
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
		<div className={classes.newHome}>
			<form className={classes.containerForm} onSubmit={handleSubmit(onSubmit)}>
				<div className={classes.grid}>
					<div className={classes.input}>
						<Autocomplete
							className={classes.inputTextLeft}
							options={afiliados}
							value={afiliado}
							getOptionLabel={(option: any) => (option.afiCod ? `${option.afiCod}` : '')}
							isOptionEqualToValue={(option: any, value: any) => option.afiCod === value.afiCod}
							onChange={(event, value: any) => {
								setAfiliado(value);
							}}
							renderInput={(params: any) => (
								<TextField
									{...params}
									label='Afiliado'
									variant='outlined'
									{...register('commerce.idActivityXAfiliado')}
								/>
							)}
						/>
						<TextField className={classes.inputTextLeft} label='Doc. Ident.' {...register('commerce.comerRif')} />
						<TextField
							className={classes.inputTextLeft}
							label='Nombre Comercio'
							{...register('commerce.comerDesc')}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classes.inputTextLeft}
							label='Cuenta de Banco'
							value={comerCuentaBanco}
							onChange={(e) => {
								if (expNroCuenta.test(e.target.value as string)) {
									setComerCuentaBanco(e.target.value);
								}
							}}
						/>
					</div>
					<div className={classes.input}>
						<FormControlLabel
							label='Contribuyente especial'
							control={<Checkbox {...register('commerce.comerCodTipoCont')} />}
						/>
						<TextField
							className={classes.inputTextLeft}
							label='Estado'
							defaultValue={'Caracas'}
							{...register('commerce.locationCommerce.estado')}
						/>
						<TextField
							className={classes.inputTextLeft}
							label='Municipio'
							defaultValue={'Libertador'}
							{...register('commerce.locationCommerce.municipio')}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classes.inputTextLeft}
							label='Ciudad'
							{...register('commerce.locationCommerce.ciudad')}
							defaultValue={'Barrio 1'}
						/>
						<TextField
							className={classes.inputTextLeft}
							label='Parroquia'
							defaultValue={'Cateral3'}
							{...register('commerce.locationCommerce.parroquia')}
						/>
						<TextField
							className={classes.inputTextLeft}
							label='Casa'
							{...register('commerce.locationCommerce.casa')}
							defaultValue={'Local 1'}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classes.inputTextLeft}
							label='Nombres Cliente'
							{...register('contacto.contNombres')}
						/>
						<TextField
							className={classes.inputTextLeft}
							label='Apellidos Cliente'
							{...register('contacto.contApellidos')}
						/>
						<TextField
							className={classes.inputTextLeft}
							label='Telefono Local'
							defaultValue={'0212'}
							{...register('contacto.contTelefLoc')}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classes.inputTextLeft}
							label='Telefono Movil'
							{...register('contacto.contTelefMov')}
						/>
						<TextField
							className={classes.inputTextLeft}
							label='Email'
							defaultValue={'@gmail.com'}
							{...register('contacto.contMail')}
						/>
					</div>
					<FormGroup>
						<FormLabel>Dias Laborales</FormLabel>
						<div className={classes.input}>
							<FormControlLabel
								control={<Checkbox {...register('commerce.daysOperacion.Lun')} defaultChecked />}
								label='Lunes'
							/>
							<FormControlLabel
								control={<Checkbox {...register('commerce.daysOperacion.Mar')} defaultChecked />}
								label='Martes'
							/>
							<FormControlLabel
								control={<Checkbox {...register('commerce.daysOperacion.Mie')} defaultChecked />}
								label='Miercoles'
							/>
							<FormControlLabel
								control={<Checkbox {...register('commerce.daysOperacion.Jue')} defaultChecked />}
								label='Jueves'
							/>
							<FormControlLabel
								control={<Checkbox {...register('commerce.daysOperacion.Vie')} defaultChecked />}
								label='Viernes'
							/>
						</div>
						<div className={classes.input}>
							<FormControlLabel
								control={<Checkbox {...register('commerce.daysOperacion.Sab')} defaultChecked />}
								label='Sabado'
							/>
							<FormControlLabel
								control={<Checkbox {...register('commerce.daysOperacion.Dom')} defaultChecked />}
								label='Domingo'
							/>
						</div>
					</FormGroup>
				</div>
				<Button
					variant='contained'
					type='submit'
					disabled={loading || ready}
					style={{ width: '100%', maxWidth: '300px' }}
				>
					Enviar
				</Button>
			</form>
		</div>
	);
};

export default NewCommerce;
