import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { FC, useState } from 'react';
import { sxStyled, useStyles } from '../../styles';
import Consulta from './Consulta';
import CreateTerminal from './Create';

const Terminal: FC = () => {
	const classes = useStyles();
	const [tab, setTab] = useState('consulta');

	const handleChange = (event: any, newValue: any) => {
		setTab(newValue);
	};

	return (
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
					{
						<Tab
							sx={sxStyled.tabName}
							label='Nuevo'
							value={'newT'}
							classes={{ root: tab === 'newT' ? classes.tabLabelSelected : classes.tabLabel }}
							wrapped
						/>
					}
				</TabList>
				<TabPanel value={'consulta'} classes={{ root: classes.tabPanel }}>
					<Consulta />
				</TabPanel>
				<TabPanel value={'newT'} classes={{ root: classes.tabPanel }}>
					<CreateTerminal />
				</TabPanel>
			</TabContext>
		</div>
	);
};

export default Terminal;
