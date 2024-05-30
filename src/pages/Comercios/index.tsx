import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { APTContextProvider } from 'context/APTContext';
import { FC, useState } from 'react';
import Comercio from './components/comercio';
import Terminal from './components/terminal';
import { sxStyled, useStyles } from './styles';

const Merchant: FC = () => {
	const classes = useStyles();
	const [tab, setTab] = useState('comercio');

	const handleChange = (event: any, newValue: any) => {
		setTab(newValue);
	};

	return (
		<APTContextProvider>
			<div className={classes.root}>
				<TabContext value={tab}>
					<TabList onChange={handleChange} indicatorColor='primary' textColor='primary'>
						<Tab
							sx={sxStyled.tabName}
							label='Comercio'
							value={'comercio'}
							wrapped
							classes={{ root: tab === 'comercio' ? classes.tabLabelSelected : classes.tabLabel }}
						/>
						<Tab
							sx={sxStyled.tabName}
							label='Terminal'
							value={'terminal'}
							classes={{ root: tab === 'terminal' ? classes.tabLabelSelected : classes.tabLabel }}
							wrapped
						/>
					</TabList>
					<TabPanel value={'comercio'} classes={{ root: classes.tabPanel }}>
						<Comercio />
					</TabPanel>
					<TabPanel value={'terminal'} classes={{ root: classes.tabPanel }}>
						<Terminal />
					</TabPanel>
				</TabContext>
			</div>
		</APTContextProvider>
	);
};

export default Merchant;
