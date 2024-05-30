import { Button, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import APTContext from 'context/APTContext';

import useAxios from 'config';
import { FC, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useStylesCommerce } from '../styles';
import Swal from 'sweetalert2';
import { IComercioForTerm, IPrefijoValue } from 'interfaces/aptContext';
import { multiGetterAxios } from 'utilis/multiGetterAxios';

const expCI: RegExp = /^[0-9]{0,20}$/;

const CreateTerminal: FC = () => {
	const classes = useStylesCommerce();

	const [loading, setloading] = useState(false);
	const [ready, setReady] = useState(true);

	const { getPrefijosValue } = useContext(APTContext);

	const [prefijos, setPrefijos] = useState<IPrefijoValue[]>([]);
	const [prefijo, setPrefijo] = useState<IPrefijoValue | null>(null);

	const [comercios, setComercios] = useState<IComercioForTerm[]>([]);
	const [comercio, setComercio] = useState<IComercioForTerm | null>();

	const [cantidad, setCantidad] = useState<number>(1);
	const [nroCuenta, setNroCuenta] = useState<string>('');

	useEffect(() => {
		if (!comercio || !prefijo || !cantidad || nroCuenta.length !== 20) setReady(true);
		else setReady(false);
	}, [prefijo, cantidad, nroCuenta, comercio]);

	useLayoutEffect(() => {
		const init = async () => {
			const routes = [`/afiliados/all`, `comercios/agregador/all`];
			await multiGetterAxios(routes).then((responses) => {
				setComercios(responses[1].data.info);
			});
			const resPre: IPrefijoValue[] = await getPrefijosValue({
				name: localStorage.getItem('agregador') as string,
			});
			if (resPre.length) {
				setPrefijos(resPre);
			}
		};
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit = () => {
		Swal.fire({
			title: `¿Esta seguro de crear el Terminal?`,
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
					const data = {
						prefijo: prefijo?.value,
						cantidad: cantidad || 1,
						nroCuenta,
						comerRif: comercio?.comerRif,
					};
					const res: any = await useAxios.post('/aboterminal/create', data);
					setloading(false);
					Swal.fire(`Terminales para "${data.comerRif}"`, `${res.data.terminales}`, 'success');
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
			<div className={classes.containerForm} style={{ maxWidth: '70%' }}>
				<div className={classes.input}>
					<Autocomplete
						className={classes.inputTextLeft}
						options={prefijos}
						value={prefijo}
						getOptionLabel={(option: any) => (option.value ? `${option.value}` : '')}
						isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
						onChange={(event, value: any) => {
							setPrefijo(value);
						}}
						renderInput={(params: any) => <TextField {...params} label='Prefijo' variant='outlined' />}
					/>
					<TextField
						label='Cantidad'
						variant='outlined'
						type='number'
						className={classes.inputTextLeft}
						onChange={(e) => setCantidad(Number(e.target.value))}
						value={cantidad}
					/>
				</div>
				<div className={classes.input}>
					<Autocomplete
						className={classes.inputTextLeft}
						options={comercios}
						value={comercio}
						getOptionLabel={(option: any) => (option.comerRif ? `${option.comerRif} | ${option.comerDesc}` : '')}
						isOptionEqualToValue={(option: IComercioForTerm | null, value: IComercioForTerm | null) =>
							option?.comerRif === value?.comerRif
						}
						onChange={(event, value: IComercioForTerm | null) => {
							setComercio(value);
							if (value) {
								setNroCuenta(value.comerCuentaBanco);
							}
						}}
						renderInput={(params: any) => <TextField {...params} label='Comercio' variant='outlined' />}
					/>
					<TextField
						className={classes.inputTextLeft}
						label='Cuenta de Banco'
						onChange={(e) => {
							if (expCI.test(e.target.value as string)) {
								setNroCuenta(e.target.value);
							}
						}}
						value={nroCuenta}
					/>
				</div>
			</div>
			<Button variant='contained' disabled={loading || ready} onClick={onSubmit}>
				Enviar
			</Button>
		</div>
	);
};

export default CreateTerminal;
