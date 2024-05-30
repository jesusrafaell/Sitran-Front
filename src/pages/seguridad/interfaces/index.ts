export interface Department {
	id: number;
	name: string;
	active: number;
}

export interface View {
	id: number;
	name: string;
	root: string;
	status: boolean;
}

export interface Roles {
	active: number;
	id: number;
	name: string;
}

export interface Permisos {
	id: number;
	name: string;
	status: boolean;
	view: View;
	description: string;
}

export interface Agregador {
	id: number;
	name: string;
	key: number;
	active: number;
}

export interface IUser {
	email: string;
	id: number;
	id_type: string;
	ident: string;
	login: string;
	name: string;
	updatedAt: string;
}

export interface Base {
	id: number;
	name: string;
}

export interface Params {
	id: number;
	key: string;
	name: string;
	description: string;
	value: string;
}
