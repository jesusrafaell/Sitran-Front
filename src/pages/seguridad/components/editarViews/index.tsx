/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import { Agregador, Department, Roles } from 'pages/seguridad/interfaces';
import { useState } from 'react';
import LoaderLine from '../../../../components/loader/LoaderLine';
import { sxStyled, useStyles } from '../../styles';
import EditarVistasByAgregador from './components/EditarVistasByAgregador';
import EditarVistasByProfile from './components/EditarVistasByProfile';

export interface PropsVistasByProfile {
	listDepartment: Department[];
	listRoles: Roles[];
	listAgregadores: Agregador[];
}

const EditarViews: React.FC<PropsVistasByProfile> = ({ listDepartment, listRoles, listAgregadores }) => {
	const classes = useStyles();
	const [tab, setTab] = useState('gestionUsuarios');

	const handleChange = (event: any, newValue: any) => {
		setTab(newValue);
	};

	return (
		<div className={classes.wrapperSecond}>
			{!listDepartment.length || !listRoles.length || !listAgregadores.length ? (
				<LoaderLine />
			) : (
				<TabContext value={tab}>
					<TabList onChange={handleChange} indicatorColor='primary' textColor='primary'>
						<Tab
							sx={sxStyled.tabName}
							label='Perfiles'
							value={'viewsXprofile'}
							wrapped
							classes={{ root: classes.tabLabel }}
						/>
						<Tab
							sx={sxStyled.tabName}
							label='Agregadores'
							value={'viewsXagregador'}
							wrapped
							classes={{ root: classes.tabLabel }}
						/>
					</TabList>
					<TabPanel value={'viewsXprofile'} classes={{ root: classes.tabPanel }}>
						<EditarVistasByProfile
							listDepartment={listDepartment}
							listRoles={listRoles}
							listAgregadores={listAgregadores}
						/>
					</TabPanel>
					<TabPanel value={'viewsXagregador'} classes={{ root: classes.tabPanel }}>
						<EditarVistasByAgregador listAgregadores={listAgregadores} />
					</TabPanel>
				</TabContext>
			)}
		</div>
	);
};

export default EditarViews;
