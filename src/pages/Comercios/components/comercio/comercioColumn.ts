import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
	{ headerName: 'Doc. Ident', field: 'comerRif', type: 'string', width: 120, editable: false },
	{ headerName: 'Nombre', field: 'comerDesc', type: 'string', width: 200, editable: false },
	{ headerName: 'Cuenta', field: 'comerCuentaBanco', type: 'string', width: 180, editable: false },
	{ headerName: 'Contacto', field: 'contMail', type: 'string', width: 220, editable: false },
	{ headerName: 'Afiliado', field: 'afiliado', type: 'string', width: 240, editable: false },
	{ headerName: 'Tlf. Movil', field: 'contTelefMov', type: 'string', width: 140, editable: false },
	{ headerName: 'Tlf. Local', field: 'contTelefLoc', type: 'string', width: 140, editable: false },
];
