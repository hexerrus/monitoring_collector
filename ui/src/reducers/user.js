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
    case 'GET_USERS_LOADED':
      var newState = { ...state,  all: action.data, updateRequre: false };
      console.log('GET_USERS_LOADED', newState);
      return newState;
    break;
    case 'GET_USER_PERMISSION_LOADED':
      var newState = { ...state,  my: action.data, myUpdateRequre: false };
      console.log('GET_USER_PERMISSION_LOADED', newState);
      return newState;
    break;
    case 'UPDATE_USER_AVALIBLE_LOADED':
      console.log('UPDATE_SERVER_LOADED:', action.data);
      return { ...state, updateRequre: true };
    break;
    case 'UPDATE_USER_SHOW_LOADED':
      console.log('UPDATE_USER_SHOW_LOADED:', action.data);
      return { ...state, updateRequre: true };
    break;
    case 'UPDATE_ACCOUNT_SHOW_LOADED':
      console.log('UPDATE_ACCOUNT_SHOW_LOADED:', action.data);
      return { ...state, myUpdateRequre: true };
    break;
    case 'UPDATE_USER_PASSWORD_LOADED':
      console.log('UPDATE_USER_PASSWORD_LOADED:', action.data);
      return { ...state, updateRequre: true };
    break;
    case 'DELETE_USER_LOADED':
      console.log('DELETE_USER_LOADED:', action.data);
      return { ...state, updateRequre: true };
    break;
    case 'UPDATE_USER_REQUIRE':
      return { ...state, updateRequre: true };
    break;
    case 'UPDATE_USER_ADMIN_LOADED':
      return { ...state, updateRequre: true };
    break;
    case 'GET_LDAP_SETTING_LOADED':
      return { ...state, ldap: action.data, ldapUpdateRequre: false };
    break;
    case 'SET_LDAP_SETTING_LOADED':
      return { ...state, ldapUpdateRequre: true };
    break;
    case 'TEST_LDAP_SETTING_LOADED':
      return { ...state, test_result: action.data };
    break;

    default:
      return state;
  }

}
