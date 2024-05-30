import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../../../config';
import { multiGetterAxios } from '../../../utilis/multiGetterAxios';
import { Agregador, Base, Department, Roles } from '../interfaces';

export const seguridad = {
	getAllUser,
	getAllListSeguridad,
	getAllListPermiss,
	savePermiss,
	getAllListViews,
	getAllListViewsAgregador,
	editViewsByProfile,
	editViewsByAgregador,
	updateDepartments,
	createDepartment,
	getAllListParams,
};

export async function getAllUser() {
	try {
		const res = await useAxios.get('/seguridad/worker/all');
		return {
			ok: true,
			users: res.data.info,
		};
	} catch (err) {
		return {
			ok: false,
			err,
		};
	}
}

interface IAllListSeguridad {
	ok: boolean;
	departments?: Department[];
	roles?: Roles[];
	status?: Base[];
	agregadores?: Agregador[];
}

export async function getAllListSeguridad(): Promise<IAllListSeguridad> {
	try {
		const routes = [
			`seguridad/departments/all`,
			`seguridad/roles/all`,
			`seguridad/status/all`,
			`seguridad/agregadores/all`,
		];

		return multiGetterAxios(routes)
			.then((responses) => {
				// console.log('res', responses);
				return {
					ok: true,
					departments: responses[0].data.info,
					roles: responses[1].data.info,
					status: responses[2].data.info,
					agregadores: responses[3].data.info,
				};
			})
			.catch((errors) => {
				console.log('error multi axos', errors);
				return {
					ok: false,
				};
			});
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
		};
	}
}

export async function getAllListPermiss(dep: number, rol: number) {
	try {
		const res: AxiosResponse<any> = await useAxios.get(`/seguridad/permissions/${dep}/${rol}`);
		return {
			ok: true,
			permiss: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function savePermiss(dep: number, rol: number, permiss: any[]) {
	try {
		const res: AxiosResponse<any> = await useAxios.post(`/seguridad/permissions/${dep}/${rol}`, permiss);
		return {
			ok: true,
			permiss: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export interface ViewsGestion {
	id: number;
	name: string;
	status: boolean;
	description: string;
}

export interface ViewRes {
	ok: boolean;
	views?: ViewsGestion[];
	err?: any;
}

export async function getAllListViews(dep: number, rol: number, agr: number): Promise<ViewRes> {
	try {
		const res: AxiosResponse<any> = await useAxios.get(`/seguridad/views/dep/${dep}/rol/${rol}/agr/${agr}`);
		console.log(res.data.info);
		return {
			ok: true,
			views: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function editViewsByProfile(
	dep: number,
	rol: number,
	agr: number,
	views: ViewsGestion[]
): Promise<{ ok: boolean; err?: any }> {
	try {
		await useAxios.put(`/seguridad/views/dep/${dep}/rol/${rol}/agr/${agr}`, views);
		return {
			ok: true,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function getAllListViewsAgregador(agr: number): Promise<ViewRes> {
	try {
		const res: AxiosResponse<any> = await useAxios.get(`/seguridad/views/agr/${agr}`);
		return {
			ok: true,
			views: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function editViewsByAgregador(
	agr: number,
	views: ViewsGestion[]
): Promise<{ ok: boolean; err?: any }> {
	try {
		await useAxios.put(`/seguridad/views/agr/${agr}`, views);
		return {
			ok: true,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function updateDepartments(deps: any) {
	// console.log(deps);
	try {
		await useAxios.put(`/seguridad/departments/update`, { listDeps: deps });
		return {
			ok: true,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function createDepartment(department: string) {
	try {
		const res: any = await useAxios.post(`/seguridad/department/create`, { nameDep: department });
		return {
			ok: true,
			newDepartment: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function getAllListParams() {
	try {
		const res: AxiosResponse<any> = await useAxios.get(`/seguridad/params/all`);
		return {
			ok: true,
			params: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}
