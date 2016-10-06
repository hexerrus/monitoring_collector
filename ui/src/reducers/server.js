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
    case 'SERVERS_LOADED':
      var newState = { ...state,  all: action.data, updateRequre: false };
      console.log('new_state222:', newState);
      return newState;
    break;
    case 'UPDATE_SERVER_LOADED':
      console.log('UPDATE_SERVER_LOADED:', action.data);
      return { ...state, updateRequre: true };
    break;
    case 'CREATE_SERVER_LOADED':
      console.log('CREATE_SERVER_LOADED:', action.data);
      return { ...state, updateRequre: true };
    break;
    case 'DELETE_SERVER_LOADED':
      console.log('DELETE_SERVER_LOADED:', action.data);
      return { ...state, updateRequre: true };
    break;
    case 'GET_SERVERS_INFO_LOADED':
      console.log('GET_SERVERS_INFO_LOADED:', action.data);
      return { ...state, info: action.data };
    break;
    default:
      return state;
  }

}
