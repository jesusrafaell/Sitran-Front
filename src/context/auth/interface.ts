import { History } from 'history';
import { IPrefijos } from 'interfaces/aptContext';
import { InterfaceObject, UserInterface } from '../../interfaces/auth';

export interface User {
	email: string;
	login: string;
}

export interface Views {
	name: string;
	id: number;
	key: number;
	root: string;
	active: number;
}

export interface ContextAuth {
	user: UserInterface | null;
	views: Views[] | [];
	permiss: InterfaceObject | {};
	prefijos: IPrefijos[] | [];
	handleLogin: (user: String, password: String, historyA?: History<unknown>) => void;
	handleLogout: () => void;
	isSupervisor: boolean;
	isTrabajador: boolean;
	isAdmin: boolean;
}
