import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import { FC, useLayoutEffect, useState } from 'react';
import { sxStyled, useStyles } from './styles';

//redux
import LoaderLine from '../../components/loader/LoaderLine';
import EditarDepartments from './components/editarDepartments';
import EditarParams from './components/editarParams';
import GestionUsuarios from './components/editarUsuarios';
import EditarViews from './components/editarViews';
import { Agregador, Base, Department, IUser, Roles } from './interfaces';
import { seguridad } from './services/seguridad';

const Seguridad: FC = () => {
	//const { permiss } = useContext(AuthContext);
	const classes = useStyles();
	const [tab, setTab] = useState('gestionUsuarios');
	const [listDepartment, setListDepartment] = useState<Department[] | []>([]);
	const [listAgregadores, setListAgregadores] = useState<Agregador[] | []>([]);
	const [listStatus, setListStatus] = useState<Base[] | []>([]);
	const [listRoles, setListRoles] = useState<Roles[] | []>([]);
	const [allUser, setUsers] = useState<IUser[]>([]);

	const getData = async () => {
		const res: any = await seguridad.getAllUser();
		if (res.ok) {
			setUsers(res.users);
		}
	};

	const getList = async () => {
		const res = await seguridad.getAllListSeguridad();
		if (res.departments && res.departments.length) {
			setListDepartment(res.departments);
		}
		if (res.roles && res.roles.length) {
			setListRoles(res.roles);
		}
		if (res.status && res.status.length) {
			setListStatus(res.status);
		}
		if (res.agregadores && res.agregadores.length) {
			setListAgregadores(res.agregadores);
		}
	};

	useLayoutEffect(() => {
		const init = async () => {
			await getList();
			await getData();
		};
		init();
	}, []);

	const handleChange = (event: any, newValue: any) => {
		setTab(newValue);
	};

	return (
		<div className={classes.wrapper}>
			{!allUser.length ? (
				<LoaderLine />
			) : (
				<TabContext value={tab}>
					<TabList
						onChange={handleChange}
						aria-label='lab API tabs example'
						indicatorColor='primary'
						textColor='primary'>
						<Tab
							sx={sxStyled.tabName}
							label='Usuarios'
							value={'gestionUsuarios'}
							wrapped
							classes={{ root: tab === 'gestionUsuarios' ? classes.tabLabelSelected : classes.tabLabel }}
						/>
						<Tab
							sx={sxStyled.tabName}
							label='Vistas'
							value={'gestionViews'}
							wrapped
							classes={{ root: tab === 'gestionViews' ? classes.tabLabelSelected : classes.tabLabel }}
						/>
						<Tab
							sx={sxStyled.tabName}
							label='Departamentos'
							value={'gestionDepartments'}
							wrapped
							classes={{ root: tab === 'gestionDepartments' ? classes.tabLabelSelected : classes.tabLabel }}
						/>
						<Tab
							sx={sxStyled.tabName}
							label='Parametros'
							value={'gestionParams'}
							wrapped
							classes={{ root: tab === 'gestionParams' ? classes.tabLabelSelected : classes.tabLabel }}
						/>
					</TabList>
					<TabPanel value={'gestionUsuarios'} classes={{ root: classes.tabPanel }}>
						<GestionUsuarios
							listDepartment={listDepartment}
							listAgregadores={listAgregadores}
							listRoles={listRoles}
							listStatus={listStatus}
							allUser={allUser}
							getData={getData}
						/>
					</TabPanel>
					<TabPanel value={'gestionViews'} classes={{ root: classes.tabPanel }}>
						<EditarViews listDepartment={listDepartment} listRoles={listRoles} listAgregadores={listAgregadores} />
					</TabPanel>
					<TabPanel value={'gestionDepartments'} classes={{ root: classes.tabPanel }}>
						<EditarDepartments listDepartment={listDepartment} setListDepartment={setListDepartment} />
					</TabPanel>
					<TabPanel value={'gestionParams'} classes={{ root: classes.tabPanel }}>
						<EditarParams />
					</TabPanel>
				</TabContext>
			)}
		</div>
	);
};

export default Seguridad;
