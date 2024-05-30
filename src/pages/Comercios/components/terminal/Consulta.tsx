import { GridCellParams } from '@mui/x-data-grid';
import { FC, useState } from 'react';
import Swal from 'sweetalert2';
import EditTerminal from './EditTerminal';

import Consult from 'components/ConsultTable';
import useAxios from '../../../../config';

let columns = [
	{ headerName: 'Terminal', field: 'id', type: 'string', width: 140, editable: false },
	{ headerName: 'Afiliado', field: 'aboCodAfi', type: 'string', width: 200, editable: false },
	{ headerName: 'Doc. Ident', field: 'comerRif', type: 'string', width: 130, editable: false },
	{ headerName: 'Cuenta', field: 'aboNroCuenta', type: 'string', width: 200, editable: false },
	{ headerName: 'Nombre Comercio', field: 'comerDesc', type: 'string', width: 300, editable: false },
];

export interface ITerminal {
	id: string;
	comerRif: string;
	aboNroCuenta: string;
	aboCodAfi: string;
}

const Consulta: FC = () => {
	const [valueIn, setValueIn] = useState('');
	const [loading, setLoading] = useState(false);
	const [rowData, setRowData] = useState<ITerminal[] | []>([]);

	const [open, setOpen] = useState(false);

	const [data, setData] = useState<ITerminal | null>(null);

	const handleClose = () => {
		setData(null);
		setOpen(false);
	};

	const getTerminals = async () => {
		let searchValue = valueIn
			.trim()
			.split(',')
			.filter((val) => val !== ',')
			.filter((val) => val !== '')
			.join(',')
			.replace('', '')
			.replace('\n', '');
		// console.log('searchValue', searchValue);
		if (searchValue.length > 0) {
			if (searchValue.length !== 8) {
				Swal.fire('Error', 'Longitud invalida', 'error');
				return;
			}
		}
		try {
			setLoading(true);
			const resp =
				searchValue.length === 0
					? await useAxios.get('/aboterminal/all')
					: await useAxios.get(`/aboterminal/${searchValue}`);
			setRowData(resp.data.terminales);
			setLoading(false);
			if (!resp.data.terminales.length) {
				Swal.fire('Terminal', 'No existe el terminal', 'info');
			}
		} catch (error: any) {
			// console.log(error.response);
			Swal.fire('Error', error?.response?.data?.message || 'Error en el terminal', 'error');
			setLoading(false);
		}
	};

	const SearchAction = async (e: any) => {
		if (e.key === 'Enter') {
			await getTerminals();
		}
	};

	const params = {
		exp: /^\d+((\d*)+)*$/,
		size: 8,
	};

	const handleRow = (params: GridCellParams) => {
		setData(params.row);
		setOpen(true);
	};

	return (
		<>
			<Consult
				actionFunction={SearchAction}
				columns={columns}
				rowData={rowData}
				loading={loading}
				name={'Ingrese Terminal'}
				params={params}
				setValueIn={setValueIn}
				valueIn={valueIn}
				onCellDoubleClick={handleRow}
			/>
			{data && <EditTerminal open={open} handleClose={handleClose} handleGetData={getTerminals} term={data} />}
		</>
	);
};

export default Consulta;
