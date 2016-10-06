import store from '../state';
import cookie from 'react-cookie';

export default function (state = {}, action) {
  if (action.data != undefined) {
    if (action.data.access == false) {
      console.warn('access deny login');
      cookie.remove('user');
      window.location = '/';
    }
  }

  switch (action.type) {
    case 'LOGIN_LOADED':
      if (action.data.login == true) {
        cookie.save('user', action.data, { path: '/' });
        return action.data;
      } else {
        return action.data;
      }

    break;
    case 'LOGIN_CHECK_LOADED':
      console.log('login_CHECK_loaded:', action.data);
      return action.data;

    break;
    case 'SIGN_OUT':
      console.log('it is SIGN_OUT ');
      cookie.remove('user');
      return {
        login: false,
      };
    break;
    default:
      return state;
  }

}
