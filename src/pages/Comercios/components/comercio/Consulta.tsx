import { AxiosResponse } from 'axios';
import Consult from 'components/ConsultTable';
import useAxios from 'config';
import { FC, useState } from 'react';
import { RespComercio } from '../interfaces';
import { columns } from './comercioColumn';

const ConsultaComercio: FC = () => {
	const [valueIn, setValueIn] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [rowData, setRowData] = useState<RespComercio[]>([]);

	const SearchAction = async (e: any) => {
		if (e.key === 'Enter') {
			let searchValue = valueIn.replace('\n', '');
			console.log('buscar comercio', searchValue);
			try {
				let resp: AxiosResponse<{ info: RespComercio }>;
				if (/^[a-zA-Z]+$/.test(searchValue[0])) {
					console.log(searchValue[0]);
					resp = await useAxios.get(`/comercios/${searchValue}`);
				} else {
					resp = await useAxios.get(`/comercios/terminal/${searchValue}`);
				}
				if (resp.data) {
					console.log([resp.data.info]);
					const aux = { ...resp.data.info, id: 0 };
					setRowData([aux]);
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		}
	};

	const params = {
		exp: /((^[VEJR]{0,1})[\d]*$)/,
		size: 11,
	};

	return (
		<Consult
			actionFunction={SearchAction}
			columns={columns}
			rowData={rowData}
			loading={loading}
			name={'Ingrese RIF o Terminal'}
			params={params}
			setValueIn={setValueIn}
			valueIn={valueIn}
		/>
	);
};

export default ConsultaComercio;
