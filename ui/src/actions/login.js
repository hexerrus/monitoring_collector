import { userLogin, userLoginCheckByCookie } from '../api/login';

export function userLoginAction(login, password, type) {
  return {
    type: 'PROMISE',
    actions: ['LOGIN_LOADING', 'LOGIN_LOADED', 'LOGIN_LOAD_FAILURE'],
    promise: userLogin(login, password, type),
  };
}

export function userLoginCheckByCookieAction() {
  return {
    type: 'PROMISE',
    actions: ['LOGIN_CHECK_LOADING', 'LOGIN_CHECK_LOADED', 'LOGIN_CHECK_LOAD_FAILURE'],
    promise: userLoginCheckByCookie(),
  };
}

export function signOut() {
  return {
    type: 'SIGN_OUT',
  };
}
