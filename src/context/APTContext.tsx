import { APTAxios } from 'config';
import {
	IActivacion,
	IActivacionM,
	IAPTContext,
	IPrefijo,
	IPrefijos,
	ITerminal,
	ITerminalM,
} from 'interfaces/aptContext';
import { createContext, ReactChild, useLayoutEffect, useState } from 'react';
import { afiliadosList, masivoNew, masivoStatus, newPref, newTerm, Pref, statusChange } from 'router/url';

interface Props {
	children: ReactChild;
}

const APTContext = createContext<IAPTContext>({
	prefijos: [],
	afiliados: [],
	setPrefijos: () => null,
	createParams: () => new Promise(() => {}),
	createTerminal: () => new Promise(() => {}),
	createTerminalMasivo: () => new Promise(() => {}),
	cambiarStatusTerminal: () => new Promise(() => {}),
	cambiarStatusTerminalMasivo: () => new Promise(() => {}),
	obtenerAfiliados: () => new Promise(() => {}),
	updatePrefijos: () => null,
	getPrefijosValue: () => new Promise(() => {}),
});

export const APTContextProvider = ({ children }: Props) => {
	const [prefijos, setPrefijos] = useState<IPrefijos[]>([]);
	const [afiliados, setAfiliados] = useState<any[] | []>([]);

	const createParams = async (params: IPrefijo) => {
		try {
			return await APTAxios.post(newPref, params).then((resp) => resp.data.info);
		} catch (error: any) {
			console.log('error crear params', error.response?.data?.message);
		}
	};

	const getPrefijosValue = async (params: { name: string }) => {
		try {
			return await APTAxios.post(Pref, params).then((resp) => resp.data.Data);
		} catch (error: any) {
			console.log('error crear params', error.response?.data?.message);
		}
	};

	const createTerminal = async (params: ITerminal) => {
		try {
			return await APTAxios.post(newTerm, params).then((resp) => resp.data);
		} catch (error: any) {
			console.log('error crear terms', error.response?.data?.message);
		}
	};

	const createTerminalMasivo = async (params: ITerminalM) => {
		try {
			return await APTAxios.post(masivoNew, params).then((resp) => resp.data);
		} catch (error: any) {
			console.log('error crear terms', error.response?.data?.message);
		}
	};

	const cambiarStatusTerminalMasivo = async (params: IActivacionM) => {
		try {
			return await APTAxios.post(masivoStatus, params).then((resp) => resp.data);
		} catch (error: any) {
			console.log('error crear terms', error.response?.data?.message);
		}
	};

	const cambiarStatusTerminal = async (params: IActivacion) => {
		try {
			return await APTAxios.post(statusChange, params).then((resp) => resp.data);
		} catch (error: any) {
			console.log('error crear terms', error.response?.data?.message);
		}
	};

	const obtenerAfiliados = async (params: number) => {
		const org = prefijos.filter((val) => val.id === params)[0].org;
		try {
			const afiList = await APTAxios.post(afiliadosList, { org }).then((resp) => resp.data.Data);
			setAfiliados(afiList);
			return afiList;
		} catch (error: any) {
			console.log('error crear terms', error.response?.data?.message);
		}
	};

	const updatePrefijos = async () => {
		await getData();
	};

	const getData = async () => {
		try {
			const resp = await APTAxios.get(Pref).then((resp) => resp.data.Data);
			const res2 = await APTAxios.post(afiliadosList, { org: '720' }).then((resp) => resp.data.Data);
			setAfiliados(res2.Data);
			setPrefijos(resp);
			setAfiliados(res2);
		} catch (error: any) {
			console.log('error prefijos: ', error.response?.data?.message);
		}
	};

	useLayoutEffect(() => {
		getData();
	}, []);

	return (
		<APTContext.Provider
			value={{
				prefijos,
				afiliados,
				setPrefijos,
				createParams,
				updatePrefijos,
				createTerminal,
				createTerminalMasivo,
				cambiarStatusTerminal,
				cambiarStatusTerminalMasivo,
				obtenerAfiliados,
				getPrefijosValue,
			}}>
			{children}
		</APTContext.Provider>
	);
};

export default APTContext;
