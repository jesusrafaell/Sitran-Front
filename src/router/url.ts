export const baseUrl = '/';
export const login = `${baseUrl}auth/login`;
export const movimientos = `${baseUrl}movimientos/`;
export const cuotas = `${baseUrl}cuotas/`;
export const cuotasR = `${baseUrl}cuotas-resumen/`;
export const mantenimientos = `${baseUrl}mantenimiento/`;
export const reportexaci = `${baseUrl}mantenimiento-aci/`;
export const librePago = `${baseUrl}libre-pago/`;
export const pagoCuota = `${baseUrl}pago-cuota/`;
export const transaccional = `${baseUrl}transaccional/`;
export const contraCargoUp = `${baseUrl}contracargo-up/`;
export const seguridad = `${baseUrl}seguridad/`;
export const contracargo = `${baseUrl}contracargo/`;
export const execContracargo = `${baseUrl}exec-contracargo/`;
export const contabilidadACI = `${baseUrl}contabilidadACI/`;
export const abonoClienteRechazado = `${baseUrl}abonoclientes/rechazado/up/`;
export const pagTerminales = `${baseUrl}paginaTerminales/`;
export const comercios = `${baseUrl}comercios/`;
//
export const cancelarCuotas = `${baseUrl}cancelacion-cuotas/`;

export const urlPrivate = [
	contraCargoUp,
	movimientos,
	cuotas,
	cuotasR,
	mantenimientos,
	cancelarCuotas,
	reportexaci,
	librePago,
	pagoCuota,
	transaccional,
	seguridad,
	execContracargo,
	abonoClienteRechazado,
	pagTerminales,
	comercios,
];

export const newPref = `new/pref`;
export const newTerm = `new`;
export const Pref = `pref`;
export const Afi = `afi`;
export const masivoNew = `masivo/new`;
export const afiliadosList = `afiliados`;
export const statusChange = `actdesc`;
export const masivoStatus = `masivo/actdesc`;

export const APTUrls = [newPref, Pref, Afi, newTerm, masivoNew, afiliadosList, statusChange, masivoStatus];

export const urlPublic = [login];
