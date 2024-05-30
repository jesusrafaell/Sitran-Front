import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BuildIcon from '@mui/icons-material/Build';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HandshakeIcon from '@mui/icons-material/Handshake';
import HardwareIcon from '@mui/icons-material/Hardware';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Views } from 'context/auth/interface';
import * as url from '../../router/url';

export interface ILink {
	key: number;
	name: string;
	link: string;
	icon: JSX.Element;
}

export const auxLink: ILink[] = [
	{
		key: 2,
		name: 'Movimientos',
		link: url.movimientos,
		icon: <ImportExportIcon />,
	},
	{
		key: 3,
		name: 'Cuotas',
		link: url.cuotas,
		icon: <AttachMoneyIcon />,
	},
	{
		key: 4,
		name: 'Cuotas Resumidas',
		link: url.cuotasR,
		icon: <AttachMoneyIcon />,
	},
	{
		key: 5,
		name: 'Mantenimiento',
		link: url.mantenimientos,
		icon: <BuildIcon />,
	},
	{
		key: 6,
		name: 'Mantenimiento por ACI',
		link: url.reportexaci,
		icon: <HardwareIcon />,
	},
	{
		key: 7,
		name: 'Libre Pago',
		link: url.librePago,
		icon: <ReceiptIcon />,
	},
	{
		key: 8,
		name: 'Reporte Pago Cuota',
		link: url.pagoCuota,
		icon: <ReceiptLongIcon />,
	},
	{
		key: 9,
		name: 'Transaccional',
		link: url.transaccional,
		icon: <HandshakeIcon />,
	},
	{
		key: 10,
		name: 'Archivo ContraCargo',
		link: url.contraCargoUp,
		icon: <CloudUploadIcon />,
	},
	{
		key: 11,
		name: 'Gestion de Seguridad',
		link: url.seguridad,
		icon: <BuildIcon />,
	},
	{
		key: 12,
		name: 'Contracargo Descontado',
		link: url.contracargo,
		icon: <CurrencyExchangeIcon />,
	},
	{
		key: 13,
		name: 'Ejecutar Contracargos',
		link: url.execContracargo,
		icon: <CurrencyExchangeIcon />,
	},
	{
		key: 14,
		name: 'Contab. de ACI',
		link: url.contabilidadACI,
		icon: <RequestQuoteIcon />,
	},
	{
		key: 15,
		name: 'Archivo AC Rechazado',
		link: url.abonoClienteRechazado,
		icon: <CloudUploadIcon />,
	},
	{
		key: 16,
		name: 'Pag. Terminales',
		link: url.pagTerminales,
		icon: <AddToHomeScreenIcon />,
	},
	{
		key: 17,
		name: 'Comercios',
		link: url.comercios,
		icon: <StorefrontIcon />,
	},
];
export const handleTitleSection = (seccion: string, views: Views[]) => {
	const Agregador = window.localStorage.getItem('agregador')
		? window.localStorage.getItem('agregador')
		: 'Tranred';
	const section = auxLink.filter((val) => val.link === seccion);
	if (section.length === 0) {
		document.getElementById('Titulo')!.innerHTML = `${Agregador} - SITRAN`;
		return 'Inicio';
	}
	const name_views = views.filter((val) => val.key === section[0].key);
	document.getElementById('Titulo')!.innerHTML = `${name_views[0].name} - SITRAN`;
	return name_views.length > 0 ? name_views[0].name : 'Inicio';
};
