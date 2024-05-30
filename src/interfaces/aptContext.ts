import { Dispatch, SetStateAction } from 'react';

export interface IAfiliado {
	afiCod: string;
}
export interface IPrefijo {
	value: string;
	type_pos: string;
	participant: string;
	parent: string;
	org: string;
	name: string;
}
export interface ITerminal {
	afiliado: string;
	cantidad: number;
	prefijo: string;
}

export interface IActivacion {
	terminal: string;
	estado: number;
	responsable: string;
}

export interface IPrefijos extends IPrefijo {
	id: number;
}

export interface IPrefijoValue {
	value: number;
}

export interface ITerminalM {
	Terminal: ITerminal[];
}
export interface IActivacionM {
	Terminal: IActivacion[];
}

export interface IComercioForTerm {
	comerCod: number;
	comerCuentaBanco: string;
	comerDesc: string;
	comerRif: string;
}

export interface IAPTContext {
	prefijos: IPrefijos[];
	afiliados: IAfiliado[];
	setPrefijos: Dispatch<SetStateAction<IPrefijos[]>>;
	createParams: (params: IPrefijo) => Promise<any>;
	createTerminal: (params: ITerminal) => Promise<any>;
	createTerminalMasivo: (params: ITerminalM) => Promise<any>;
	cambiarStatusTerminal: (params: IActivacion) => Promise<any>;
	cambiarStatusTerminalMasivo: (params: IActivacionM) => Promise<any>;
	obtenerAfiliados: (params: number) => Promise<any>;
	updatePrefijos: () => void;
	getPrefijosValue: (params: { name: string }) => Promise<IPrefijoValue[]>;
}
