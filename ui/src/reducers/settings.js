import store from '../state';
import cookie from 'react-cookie';

export default function (state = {}, action) {
  if (action.data != undefined) {
    if (action.data.access == false) {
      console.warn('access deny server');
      cookie.remove('user');
      window.location = '/';
    }
  }

  switch (action.type) {
    case 'GET_DEFAULT_SETTING_LOADED':
      console.log('GET_DEFAULT_SETTING_LOADED:', action.data);
      return { ...action.data, loaded: true };
    break;
    default:
      return state;
  }

}
