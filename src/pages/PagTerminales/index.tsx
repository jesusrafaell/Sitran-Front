import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { APTContextProvider } from 'context/APTContext';
import AuthContext from 'context/auth/AuthContext';
import { FC, useContext, useState } from 'react';
import Consulta from './components/Consulta';
import Estatus from './components/Estatus';
import New from './components/New';

import Params from './components/Params';
import { sxStyled, useStyles } from './styles';

type ITabValue = 'consulta' | 'newT' | 'params' | 'editStatus';

const PagTerminales: FC = () => {
	const classes = useStyles();
	const [tab, setTab] = useState('consulta');

	const { isAdmin, isSupervisor, isTrabajador } = useContext(AuthContext);

	const handleChange = (event: any, newValue: ITabValue) => {
		setTab(newValue);
	};

	return (
		<APTContextProvider>
			<div className={classes.root}>
				<TabContext value={tab}>
					<TabList onChange={handleChange} indicatorColor='primary' textColor='primary'>
						<Tab
							sx={sxStyled.tabName}
							label='Consulta'
							value={'consulta'}
							wrapped
							classes={{ root: tab === 'consulta' ? classes.tabLabelSelected : classes.tabLabel }}
						/>
						{(isTrabajador || isSupervisor || isAdmin) && (
							<Tab
								sx={sxStyled.tabName}
								label='Nuevo'
								value={'newT'}
								classes={{ root: tab === 'newT' ? classes.tabLabelSelected : classes.tabLabel }}
								wrapped
							/>
						)}
						{(isSupervisor || isAdmin) && (
							<Tab
								sx={sxStyled.tabName}
								label='Parametros'
								value={'params'}
								classes={{ root: tab === 'params' ? classes.tabLabelSelected : classes.tabLabel }}
								wrapped
							/>
						)}
						{(isTrabajador || isSupervisor || isAdmin) && (
							<Tab
								sx={sxStyled.tabName}
								label='Cambiar Estatus'
								value={'editStatus'}
								classes={{ root: tab === 'params' ? classes.tabLabelSelected : classes.tabLabel }}
								wrapped
							/>
						)}
					</TabList>
					<TabPanel value={'consulta'} classes={{ root: classes.tabPanel }}>
						<Consulta />
					</TabPanel>
					<TabPanel value={'newT'} classes={{ root: classes.tabPanel }}>
						<New />
					</TabPanel>
					<TabPanel value={'params'} classes={{ root: classes.tabPanel }}>
						<Params />
					</TabPanel>
					<TabPanel value={'editStatus'} classes={{ root: classes.tabPanel }}>
						<Estatus />
					</TabPanel>
				</TabContext>
			</div>
		</APTContextProvider>
	);
};

export default PagTerminales;
