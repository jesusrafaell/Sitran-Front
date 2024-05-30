import Merchant from 'pages/Comercios';
import PagTerminales from 'pages/PagTerminales';
import { Meta } from 'react-router-guards/dist/types';
import AbonoClienteRechazadoUpFile from '../../pages/AbonoClienteRechazadoUpFile';
import CancelarCuotas from '../../pages/CancelarCuotas';
import ContabilidadXACI from '../../pages/ContabilidadXACI';
import Contracargo from '../../pages/Contracargo';
import ContraCargoUpFile from '../../pages/ContraCargoUpFile';
import Cuotas from '../../pages/Cuotas';
import CuotasResumido from '../../pages/CuotasResumido';
import ExecContraCargo from '../../pages/ExecContraCargo';
import Home from '../../pages/Home';
import LibrePago from '../../pages/LibrePago';
import Mantenimiento from '../../pages/Mantenimiento';
import PagoCuota from '../../pages/PagoCuota';
import RepDinamicos from '../../pages/RepDinamicos';
import ReporteXACI from '../../pages/ReporteXACI';
import Seguridad from '../../pages/seguridad';
import Transaccional from '../../pages/Transaccional';
import * as url from '../url';

export interface meta extends Meta {
	auth: boolean;
}

export interface Route {
	path: string;
	component: any;
	meta: meta;
}

const Private: Route[] = [
	{
		path: url.baseUrl,
		component: Home,
		meta: { auth: true },
	},
	{
		path: url.cancelarCuotas,
		component: CancelarCuotas,
		meta: { auth: true },
	},
	{
		path: url.transaccional,
		component: Transaccional,
		meta: { auth: true },
	},
	{
		path: url.librePago,
		component: LibrePago,
		meta: { auth: true },
	},
	{
		path: url.pagoCuota,
		component: PagoCuota,
		meta: { auth: true },
	},
	{
		path: url.reportexaci,
		component: ReporteXACI,
		meta: { auth: true },
	},
	{
		path: url.cuotas,
		component: Cuotas,
		meta: { auth: true },
	},
	{
		path: url.cuotasR,
		component: CuotasResumido,
		meta: { auth: true },
	},
	{
		path: url.mantenimientos,
		component: Mantenimiento,
		meta: { auth: true },
	},
	{
		path: url.movimientos,
		component: RepDinamicos,
		meta: { auth: true },
	},
	{
		path: url.contraCargoUp,
		component: ContraCargoUpFile,
		meta: { auth: true },
	},
	{
		path: url.seguridad,
		component: Seguridad,
		meta: { auth: true },
	},
	{
		path: url.contracargo,
		component: Contracargo,
		meta: { auth: true },
	},
	{
		path: url.execContracargo,
		component: ExecContraCargo,
		meta: { auth: true },
	},
	{
		path: url.contabilidadACI,
		component: ContabilidadXACI,
		meta: { auth: true },
	},
	{
		path: url.abonoClienteRechazado,
		component: AbonoClienteRechazadoUpFile,
		meta: { auth: true },
	},
	{
		path: url.pagTerminales,
		component: PagTerminales,
		meta: { auth: true },
	},
	{
		path: url.comercios,
		component: Merchant,
		meta: { auth: true },
	},
];

export default Private;
