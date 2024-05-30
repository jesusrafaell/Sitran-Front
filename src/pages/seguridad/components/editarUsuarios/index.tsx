import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
	Autocomplete,
	Avatar,
	Button,
	Checkbox,
	FormControl,
	Grid,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Paper,
	Select,
	SelectChangeEvent,
	TextField,
} from '@mui/material';
import { DataGrid, GridCellParams, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import APTContext from 'context/APTContext';
import { IPrefijos } from 'interfaces/aptContext';
import { MenuProps } from 'pages/PagTerminales/styles';
import { FC, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import LoaderLine from '../../../../components/loader/LoaderLine';
import { handleError } from '../../../../components/swal/alerts';
import { default as axios, default as useAxios } from '../../../../config';
import { Agregador, Base, Department, IUser, Roles } from '../../interfaces';
import { sxStyled, useStyles } from '../../styles';
import { columnsGestionUsuario } from './columnsGrid';

interface Props {
	listDepartment: Department[];
	listAgregadores: Agregador[];
	listRoles: Roles[];
	allUser: IUser[];
	listStatus: Base[];
	getData: () => Promise<void>;
}

export const listIdentType = [
	{
		name: 'V',
	},
	{
		name: 'E',
	},
	{
		name: 'J',
	},
	{
		name: 'R',
	},
	{
		name: 'P',
	},
];

const GestionUsuarios: FC<Props> = ({
	listAgregadores,
	listDepartment,
	listRoles,
	allUser,
	listStatus,
	getData,
}) => {
	const classes = useStyles();

	const [createUser, setCreateUser] = useState<boolean>(false);
	const [openUserView, setUserView] = useState<boolean>();
	//
	const [userRol, setUserRol] = useState<Roles | null>(null);
	const [userDep, setUserDep] = useState<Department | null>(null);
	const [userStatus, setUserStatus] = useState<Base | null>(null);
	const [userPrefijos, setUserPrefijos] = useState<number[]>([]);
	const [userAgr, setuserAgr] = useState<number>(0);
	// NewUser
	const [newUserRol, setnewUserRol] = useState<Roles | null>(null);
	const [newUserDep, setnewUserDep] = useState<Department | null>(null);
	const [newName, setnewName] = useState<string>('');
	const [newLogin, setnewLogin] = useState<string>('');
	const [newNroDocument, setnewNroDocument] = useState<string>('');
	const [newTypeDoc, setnewTypeDoc] = useState<string>(listIdentType[0].name);
	const [newEmail, setnewEmail] = useState<string>('');
	//
	const [userID, setUserID] = useState<number>(0);
	const [name, setName] = useState<string>('');
	const [login, setLogin] = useState<string>('');
	//
	const [disabledSelect, setDisabledSelect] = useState<boolean>(false);
	const { prefijos } = useContext(APTContext);

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className={classes.tableHeader}>
				<div className={classes.tableTitle}>Usuarios</div>
				<GridToolbarFilterButton />
				<Button
					variant='contained'
					onClick={handleCreateUser}
					className={classes.createButton}
					startIcon={<AddIcon />}>
					Crear
				</Button>
			</GridToolbarContainer>
		);
	};

	const handleCloseRow = () => {
		setUserView(false);
	};

	const resetUser = () => {
		setLogin('');
		setName('');
		setUserDep(null);
		setUserRol(null);
		setUserStatus(null);
		setUserPrefijos([]);
		setUserID(0);
	};

	const handleRow = (params: GridCellParams) => {
		console.log(params);
		resetUser();
		if (disabledSelect) return;
		getUserData(params.row);
		setUserView(true);
		setCreateUser(false);
	};

	const getUserData = async (user: IUser) => {
		setDisabledSelect(true);
		try {
			const resp = await axios.get(`seguridad/workerSecurity/${user.id}`);
			const data = resp.data.info;
			setLogin(user.login);
			setName(user.name);
			setUserDep(data.id_department);
			setUserRol(data.id_rol);
			setUserStatus(data.id_status);
			setUserPrefijos(data.prefijos.map((i: IPrefijos) => i.id));
			setuserAgr(data.agregador ? data.agregador.id : 0);
			setUserID(user.id);
		} catch (error) {
			console.log('error getUserData', error);
		}
		setDisabledSelect(false);
	};

	const handleSelect = (event: React.SyntheticEvent, value: Department | Roles | Base, item: string) => {
		switch (item) {
			case 'department':
				setUserDep(value as Department);
				break;
			case 'rol':
				setUserRol(value as Roles);
				break;
			case 'status':
				setUserStatus(value as Base);
				break;
			default:
				break;
		}
	};

	const handleNewSelect = (event: any, value: any, item: string) => {
		switch (item) {
			case 'department':
				setnewUserDep(value);
				break;
			case 'rol':
				setnewUserRol(value);
				break;
			default:
				break;
		}
	};

	const handleSaveData = () => {
		Swal.fire({
			title: '¿Estas seguro de realizar estos cambios?',
			showDenyButton: true,
			confirmButtonText: 'Si',
			denyButtonText: 'No',
			customClass: {
				actions: 'my-actions',
				confirmButton: 'order-2',
				denyButton: 'order-3',
			},
		}).then(async (result) => {
			if (result.isConfirmed && userRol && userDep && userStatus) {
				try {
					const payload = {
						//update
						id_rol: userRol.id,
						id_department: userDep.id,
						id_status: userStatus.id,
						prefix_arr: userDep.name.toLowerCase().split('banco').length > 1 ? userPrefijos : null,
						id_agr: userAgr > 0 ? userAgr : null,
					};
					await axios.put(`/seguridad/workerSecurity/${userID}`, payload);
					Swal.fire('Cambios Guardados', '', 'success');
				} catch (error) {
					handleError(error);
				}
			} else if (result.isDenied) {
				// Swal.fire('Changes are not saved', '', 'info');
			}
		});
	};

	const handleCreateUser = () => {
		setCreateUser(true);
		setUserView(false);
	};

	const closeCreateUser = () => {
		setCreateUser(false);
	};

	const handleSaveCreatedUser = async () => {
		const data = {
			name: newName,
			login: newLogin,
			email: newEmail,
			rol: newUserRol,
			dep: newUserDep,
			type_doc: newTypeDoc,
			doc: newNroDocument,
		};

		Swal.fire({
			title: `¿Estas seguro de crear el usuario ${newName}?`,
			showDenyButton: true,
			confirmButtonText: 'Si',
			denyButtonText: 'No',
			customClass: {
				actions: 'my-actions',
				confirmButton: 'order-2',
				denyButton: 'order-3',
			},
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await useAxios.post(`/seguridad/create/user`, data).then(() => {
						Swal.fire('Usuario creado con éxito.', '', 'success').then(async () => {
							await getData();
							setCreateUser(false);
						});
					});
				} catch (error: any) {
					console.log({ ...error });
					Swal.fire('Error al crear usuario.', `${error.response.data.message}`, 'error');
					// handleError(error);
				}
			} else if (result.isDenied) {
				// Swal.fire('Changes are not saved', '', 'info');
			}
		});
	};

	const validEmail = (value: string): boolean => {
		let validatedEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);
		if (!validatedEmail) {
			return true;
		} else {
			return false;
		}
	};

	const handleChange = (event: SelectChangeEvent<number[]>) => {
		const value: number[] = event.target.value as number[];
		if (value.length) {
			setUserPrefijos(value);
		} else {
			setUserPrefijos([]);
		}
	};

	const handleChangeUserAgr = (event: SelectChangeEvent<number>) => {
		const value = event.target.value as number;
		if (value) {
			setuserAgr(value);
		} else {
			setuserAgr(0);
		}
	};

	const handleSelectPref = (value: number[]) => {
		return prefijos
			.filter((pref) => value.find((i) => pref.id === i))
			.map((val) => val.value)
			.join(', ');
	};

	return (
		<>
			<Grid container spacing={4}>
				<Grid item xs={5}>
					<div style={{ height: '75vh', width: '100%' }} className={classes.tableBackground}>
						{
							// loading &&
							<DataGrid
								components={{
									Toolbar: customToolbar,
								}}
								rows={allUser}
								columns={columnsGestionUsuario}
								rowsPerPageOptions={[25, 100]}
								onCellClick={handleRow}
							/>
						}
					</div>
				</Grid>
				<Grid item xs={6}>
					{openUserView && name && login ? (
						<Paper variant='outlined'>
							<div className={classes.card}>
								<Button sx={sxStyled.closeBtn} onClick={handleCloseRow}>
									<CloseIcon />
								</Button>
								<form className={classes.form}>
									<div className={classes.grid}>
										<div className={classes.img}>
											<Avatar /*sx={sxStyled.avatarLetter}*/>{`${name.slice(0, 1)}`}</Avatar>
										</div>
										<div className={classes.selects}>
											<div className={classes.textFields}>
												<TextField
													disabled
													key={1}
													id='name'
													name='name'
													label='Nombre Completo'
													variant='outlined'
													type='text'
													value={name}
												/>
												<Autocomplete
													className={classes.inputText}
													onChange={(event, value) => (value ? handleSelect(event, value, 'department') : null)}
													value={userDep}
													getOptionLabel={(option: Department) => (option.name ? option.name : '')}
													isOptionEqualToValue={(option: Department) => option.id === userDep?.id}
													options={listDepartment}
													renderInput={(params: any) => (
														<TextField
															{...params}
															name='department'
															label='Seleciona un Departmento'
															variant='outlined'
														/>
													)}
												/>
												{userDep && userDep.id !== 1 && openUserView && (
													<Autocomplete
														className={classes.inputText}
														onChange={(event, value) => (value ? handleSelect(event, value, 'rol') : null)}
														value={userRol}
														getOptionLabel={(option: any) => (option.name ? option.name : '')}
														isOptionEqualToValue={(option, value) => option.id === value.id}
														options={listRoles}
														renderInput={(params: any) => (
															<TextField {...params} name='rol' label='Selecciona un Cargo' variant='outlined' />
														)}
													/>
												)}
												<Autocomplete
													className={classes.inputText}
													onChange={(event, value) => (value ? handleSelect(event, value, 'status') : null)}
													value={userStatus}
													getOptionLabel={(option: any) => (option.name ? option.name : '')}
													isOptionEqualToValue={(option, value) => option.id === value.id}
													options={listStatus}
													renderInput={(params: any) => (
														<TextField
															{...params}
															name='Estatus'
															label='Seleccione el estatus'
															variant='outlined'
														/>
													)}
												/>

												{userDep && userDep.name.toLowerCase().split('banco').length > 1 && openUserView && (
													<FormControl
														className={classes.inputText}
														// sx={{ m: 1, width: 300 }}
													>
														<InputLabel id='prefijos-tag'>Prefijos</InputLabel>
														<Select
															labelId='Prefijos'
															id='prefijos-select'
															name='prefijos-select'
															multiple
															value={userPrefijos}
															onChange={handleChange}
															input={<OutlinedInput label='Prefijos' />}
															renderValue={handleSelectPref}
															MenuProps={MenuProps}>
															{prefijos.map((pref) => (
																<MenuItem key={pref.id} value={pref.id}>
																	<Checkbox
																		checked={userPrefijos.filter((i) => i === (pref.id as number)).length > 0}
																	/>
																	<ListItemText>
																		{pref.value} - {pref.org} - {pref.name}
																	</ListItemText>
																</MenuItem>
															))}
														</Select>
													</FormControl>
												)}

												{userDep && userDep.name.toLowerCase() === 'api' && openUserView && (
													<FormControl
														className={classes.inputText}
														// sx={{ m: 1, width: 300 }}
													>
														<InputLabel id='prefijos-tag'>Agregador</InputLabel>
														<Select
															labelId='agregador'
															id='agregador-select'
															name='agregador-select'
															value={userAgr}
															onChange={handleChangeUserAgr}
															input={<OutlinedInput label='Agregador' />}
															MenuProps={MenuProps}>
															{listAgregadores.map((agr) => (
																<MenuItem key={agr.id} value={agr.id}>
																	<ListItemText>{agr.name}</ListItemText>
																</MenuItem>
															))}
														</Select>
													</FormControl>
												)}
											</div>
										</div>
										<Button
											/*sx={sxStyled.buttonSaveData}*/ style={{
												gridColumn: 2,
											}}
											variant='contained'
											onClick={handleSaveData}>
											Guardar
										</Button>
									</div>
								</form>
							</div>
						</Paper>
					) : createUser ? (
						<Paper variant='outlined'>
							<div className={classes.card}>
								<Button sx={sxStyled.closeBtn} onClick={closeCreateUser}>
									<CloseIcon />
								</Button>
								<form className={classes.form}>
									<div className={classes.gridNewUser}>
										<div>
											<div className={classes.textFields}>
												<TextField
													key={1}
													id='name'
													name='name'
													label='Nombre Completo'
													variant='outlined'
													type='text'
													value={newName}
													onChange={(e) => {
														setnewName(e.target.value);
													}}
													error={newName === ''}
												/>
												<TextField
													key={2}
													id='login'
													name='login'
													label='Usuario'
													variant='outlined'
													type='text'
													value={newLogin}
													onChange={(e) => {
														setnewLogin(e.target.value);
													}}
													error={newLogin === ''}
												/>
												<div>
													{/* <FormControl> */}
													<Select
														style={{ width: '25%', marginRight: '5%' }}
														label='Tipo'
														variant='outlined'
														name='id_ident_type'
														value={newTypeDoc}
														onChange={(e: any) => {
															setnewTypeDoc(e.target.value as any);
														}}
														// error={fm.errorClient}
													>
														{listIdentType.map((item: any) => {
															if (item.name === 'J') return null;
															return (
																<MenuItem key={item.name} value={item.name}>
																	{item.name}
																</MenuItem>
															);
														})}
													</Select>
													{/* </FormControl> */}
													<TextField
														style={{ width: '70%' }}
														key={3}
														id='name'
														name='name'
														label='Nro. Documento'
														variant='outlined'
														type='number'
														value={newNroDocument}
														onChange={(e: any) => {
															setnewNroDocument(e.target.value as string);
														}}
														error={newNroDocument === null || newNroDocument === ''}
													/>
												</div>
												<TextField
													key={4}
													id='email'
													name='email'
													label='Correo'
													variant='outlined'
													type='email'
													value={newEmail}
													onChange={(e: any) => {
														setnewEmail(e.target.value as any);
													}}
													error={validEmail(newEmail)}
												/>
												<Autocomplete
													className={classes.inputText}
													onChange={(event, value) => (value ? handleNewSelect(event, value, 'department') : null)}
													value={newUserDep}
													getOptionLabel={(option: Department) => (option.name ? option.name : '')}
													isOptionEqualToValue={(option: Department) => option.id === newUserDep?.id}
													options={listDepartment}
													renderInput={(params: any) => (
														<TextField
															{...params}
															name='department'
															label='Seleciona un Departmento'
															variant='outlined'
														/>
													)}
												/>
												<Autocomplete
													className={classes.inputText}
													onChange={(event, value) => (value ? handleNewSelect(event, value, 'rol') : null)}
													value={newUserRol}
													getOptionLabel={(option: any) => (option.name ? option.name : '')}
													isOptionEqualToValue={(option, value) => option.id === value.id}
													options={listRoles}
													renderInput={(params: any) => (
														<TextField {...params} name='rol' label='Selecciona un Cargo' variant='outlined' />
													)}
												/>
											</div>
										</div>
										<Button
											className={classes.saveButton}
											variant='contained'
											color='success'
											onClick={handleSaveCreatedUser}>
											Guardar Nuevo Usuario
										</Button>
									</div>
								</form>
							</div>
						</Paper>
					) : openUserView ? (
						<div style={{ position: 'relative', height: '100%' }}>
							<LoaderLine component />
						</div>
					) : null}
				</Grid>
			</Grid>
		</>
	);
};

export default GestionUsuarios;
