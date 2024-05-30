import Consult from 'components/ConsultTable';
import { APTAxios } from 'config';
import { FC, useState } from 'react';
import { Afi } from 'router/url';
import Swal from 'sweetalert2';

let columns = [
	{ headerName: 'Nombre', field: 'name_location', type: 'string', width: 210, editable: false },
	{ headerName: 'Afiliado', field: 'card_acceptor', type: 'string', width: 100, editable: false },
	{ headerName: 'Categoria', field: 'merchant_type', type: 'string', width: 320, editable: false },
	{ headerName: 'Terminal', field: 'id', type: 'string', width: 140, editable: false },
	{ headerName: 'Estatus', field: 'term_active', type: 'string', width: 140, editable: false },
	{ headerName: 'Ultima Transaccion', field: 'Ult_Msj', type: 'string', width: 240, editable: false },
];

const Consulta: FC = () => {
	const [valueIn, setValueIn] = useState('');
	const [loading, setLoading] = useState(false);
	const [rowData, setRowData] = useState<any>([]);

	const SearchAction = async (e: any) => {
		if (e.key === 'Enter') {
			let searchValue = valueIn
				.trim()
				.split(',')
				.filter((val) => val !== ',')
				.filter((val) => val !== '')
				// .map((val) => `'${val}'`)
				.join(',')
				.replace('', '')
				.replace('\n', '');
			console.log('searchValue', searchValue);
			if (searchValue.length < 8) {
				Swal.fire('Error', 'Longitud invalida', 'error');
				return;
			}
			try {
				setLoading(true);
				const url = searchValue.length === 8 ? '' : Afi;
				const payload =
					searchValue.length === 8
						? {
								terminal: searchValue,
						  }
						: { afiliado: searchValue };
				const resp = await APTAxios.post(url, payload);
				// console.log(resp.data.Terminales);
				searchValue.length === 8 ? setRowData([resp.data.Terminales]) : setRowData(resp.data.Terminales);

				setLoading(false);
			} catch (error: any) {
				console.log(error.response);
				Swal.fire('Error', error?.response?.data?.message || 'Error en el terminal', 'error');
				setLoading(false);
			}
		}
	};

	const params = {
		exp: /^\d+((\d*)+)*$/,
		size: 9,
	};

	const name = 'Ingrese Terminal o Afiliado';

	return (
		<Consult
			actionFunction={SearchAction}
			columns={columns}
			rowData={rowData}
			loading={loading}
			name={name}
			params={params}
			setValueIn={setValueIn}
			valueIn={valueIn}
		/>
	);
};

export default Consulta;
