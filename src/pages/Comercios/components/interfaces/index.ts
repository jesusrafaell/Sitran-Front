export interface RespComercio {
	id: number;
	comercio: {
		comerCod: number;
		comerCuentaBanco: string;
		comerDesc: string;
		comerRif: string;
	};
	contacto: {
		contApellidos: string;
		contMail: string;
		contNombres: string;
		contTelefLoc: string;
		contTelefMov: string;
	};
}
