import { GuardFunction } from 'react-router-guards';
import { GuardFunctionRouteProps, GuardToRoute, Next } from 'react-router-guards/dist/types';
import { Views } from '../../context/auth/interface';
import { baseUrl, login } from '../url';
import { isPrivate, route } from '../utilis/Functions';

export const Lock: GuardFunction = (to, from, next) => {
	if (to.meta.auth) {
		if (localStorage.getItem('token') !== null) {
			next();
		} else {
			next.redirect(login);
		}
	} else {
		if (localStorage.getItem('token') !== null) {
			next.redirect(baseUrl);
		} else {
			next();
		}
	}
};

export const PrivGuard = (
	to: GuardToRoute,
	from: GuardFunctionRouteProps | null,
	next: Next,
	views: Views[] | []
) => {
	if (localStorage.getItem('token') !== null && !isPrivate()) {
		next.redirect(baseUrl);
	}

	let isWorker = 1;
	// if (to.match.path === pagTerminales) next(); // Bypass url new
	let userDep = route(views, to.location.pathname);

	if (userDep) next.props({ isWorker });
	else next.redirect(baseUrl);
};
