import axios, { AxiosRequestConfig } from 'axios';
import { configure } from 'axios-hooks';
import { AgregadorSlides } from 'components/CardSlider/assets';
import { TAgregador } from 'interfaces/agregadorContext';

import LRU from 'lru-cache';

// Set config defaults when creating the instance

const dev = `http://localhost:2022`;
const devAPT = `http://192.168.253.18:858/api/term/`;

const getKeyAgregador = () => {
	const agrCache = localStorage.getItem('agregador') || 'Milpagos';
	const agregador = AgregadorSlides.find((slide) => slide.value === (agrCache as TAgregador));
	return agregador!.key;
};

const useAxios = axios.create({
	baseURL: process.env.REACT_APP_APIURL ? process.env.REACT_APP_APIURL : dev,
	headers: {
		token: localStorage.getItem('token'),
		Authorization: `${localStorage.getItem('token')}`,
		key_agregador: getKeyAgregador(),
	},
});

useAxios.defaults.headers['Content-Type'] = 'application/json';

useAxios.interceptors.response.use((resp) => {
	if (resp.data.access_token) {
		localStorage.setItem('token', resp.data.access_token);
		resp.headers.Authorization = resp.data.access_token;
	}
	return resp;
});

useAxios.interceptors.request.use((config: AxiosRequestConfig) => {
	config.headers.Authorization = localStorage.getItem('token');
	config.headers.key_agregador = getKeyAgregador();
	return config;
});

export const APTAxios = axios.create({
	baseURL: process.env.REACT_APP_APIAPT ? process.env.REACT_APP_APIAPT : devAPT,
	headers: {
		token: localStorage.getItem('token'),
		Authorization: `${localStorage.getItem('token')}`,
	},
});

APTAxios.defaults.headers['Content-Type'] = 'application/json';

APTAxios.interceptors.request.use((config: AxiosRequestConfig) => {
	config.headers.Authorization = localStorage.getItem('token');
	return config;
});

const cache = new LRU({ max: 10 });

configure({ axios, cache });
//
export default useAxios;
