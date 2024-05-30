import { Dispatch, SetStateAction } from 'react';

export type TAgregador = 'Milpagos' | 'Librepago' | 'Carropago' | 'GSComputer' | 'Tranred';

export interface IAgregador {
	id: number;
	name: string;
	key: number;
	active: number;
}

export interface IAgregadorContext {
	Agregador: TAgregador | undefined;
	ListaAgregadores: IAgregador[];
	setAgregador: Dispatch<SetStateAction<TAgregador>>;
	setListaAgregadores: Dispatch<SetStateAction<IAgregador[]>>;
}
export default IAgregadorContext;
