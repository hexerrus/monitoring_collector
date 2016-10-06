import { getAccount, updateAccountShow, updateAccountPassword } from '../api/account';

export function getAccountAction() {
  return {
    type: 'PROMISE',
    actions: ['GET_USER_PERMISSION_LOADING', 'GET_USER_PERMISSION_LOADED', 'GET_USER_PERMISSION_FAILURE'],
    promise: getAccount(),
  };
}

export function updateAccountShowAction(server, show) {
  return {
    type: 'PROMISE',
    actions: ['UPDATE_ACCOUNT_SHOW_LOADING', 'UPDATE_ACCOUNT_SHOW_LOADED', 'UPDATE_ACCOUNT_SHOW_FAILURE'],
    promise: updateAccountShow(server, show),
  };
}

export function updateAccountPasswordAction(newPassword) {
  return {
    type: 'PROMISE',
    actions: ['UPDATE_ACCOUNT_PASSWORD_LOADING', 'UPDATE_ACCOUNT_PASSWORD_LOADED', 'UPDATE_ACCOUNT_PASSWORD_FAILURE'],
    promise: updateAccountPassword(newPassword),
  };
}
