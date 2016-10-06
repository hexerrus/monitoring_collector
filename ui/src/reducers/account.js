import store from '../state';
import cookie from 'react-cookie';

export default function (state = {}, action) {
  if (action.data != undefined) {
    if (action.data.access == false) {
      console.warn('access deny user');
      cookie.remove('user');
      window.location = '/';
    }
  }

  switch (action.type) {
    case 'GET_USER_PERMISSION_LOADED':
      var newState = { ...state,  my: action.data, updateRequre: false };
      console.log('GET_USER_PERMISSION_LOADED', newState);
      return newState;
    break;

    case 'UPDATE_ACCOUNT_SHOW_LOADED':
      console.log('UPDATE_ACCOUNT_SHOW_LOADED:', action.data);
      return { ...state, updateRequre: true };
    break;

    case 'UPDATE_ACCOUNT_PASSWORD_LOADED':
      console.log('UPDATE_ACCOUNT_PASSWORD_LOADED:', action.data);
      return { ...state, updateRequre: true };
    break;

    default:
      return state;
  }

}
