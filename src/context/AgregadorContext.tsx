import useAxios from 'config';
import IAgregadorContext, { IAgregador, TAgregador } from 'interfaces/agregadorContext';
import { createContext, ReactChild, useLayoutEffect, useState } from 'react';

interface Props {
	children: ReactChild;
}

const AgregadorContext = createContext<IAgregadorContext>({
	Agregador: undefined,
	setAgregador: () => {},
	ListaAgregadores: [],
	setListaAgregadores: () => {},
});

export const AgregadorContextProvider = ({ children }: Props) => {
	const [Agregador, setAgregador] = useState<TAgregador>(
		(window.localStorage.getItem('agregador') as TAgregador) || 'Milpagos'
	);
	const [ListaAgregadores, setListaAgregadores] = useState<IAgregador[]>([]);

	const getAllAgregadores = async () => {
		const resp = await useAxios.get(`seguridad/agregadores/all`).then((resp) => resp.data.info);
		setListaAgregadores(resp);
	};

	useLayoutEffect(() => {
		getAllAgregadores();
	}, []);

	useLayoutEffect(() => {
		return () => window.location.reload();
	}, [Agregador]);

	return (
		<AgregadorContext.Provider
			value={{
				Agregador,
				setAgregador,
				ListaAgregadores,
				setListaAgregadores,
			}}>
			{children}
		</AgregadorContext.Provider>
	);
};

export default AgregadorContext;
