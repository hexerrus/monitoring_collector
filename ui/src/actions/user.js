import {
  getUsers, getUserPermission, changeUserAvalible, changeUserShow, changeAccountShow,
  updateUserPassword, deleteUser, updateUserAdmin,
} from '../api/user.js';

export function getUsersAction() {
  return {
    type: 'PROMISE',
    actions: ['GET_USERS_LOADING', 'GET_USERS_LOADED', 'GET_USERS_FAILURE'],
    promise: getUsers(),
  };
}

export function changeUserAvalibleAction(user, server, avalible) {
  return {
    type: 'PROMISE',
    actions: ['UPDATE_USER_AVALIBLE_LOADING', 'UPDATE_USER_AVALIBLE_LOADED', 'UPDATE_USER_AVALIBLE_FAILURE'],
    promise: changeUserAvalible(user, server, avalible),
  };
}

export function changeUserShowAction(user, server, show) {
  return {
    type: 'PROMISE',
    actions: ['UPDATE_USER_SHOW_LOADING', 'UPDATE_USER_SHOW_LOADED', 'UPDATE_USER_SHOW_FAILURE'],
    promise: changeUserShow(user, server, show),
  };
}

export function changeAccountShowAction(user, server, show) {
  return {
    type: 'PROMISE',
    actions: ['UPDATE_ACCOUNT_SHOW_LOADING', 'UPDATE_ACCOUNT_SHOW_LOADED', 'UPDATE_ACCOUNT_SHOW_FAILURE'],
    promise: changeAccountShow(user, server, show),
  };
}

export function updateUserPasswordAction(user, newPassword) {
  return {
    type: 'PROMISE',
    actions: ['UPDATE_USER_PASSWORD_LOADING', 'UPDATE_USER_PASSWORD_LOADED', 'UPDATE_USER_PASSWORD_FAILURE'],
    promise: updateUserPassword(user, newPassword),
  };
}

export function deleteUserAction(user) {
  return {
    type: 'PROMISE',
    actions: ['DELETE_USER_LOADING', 'DELETE_USER_LOADED', 'DELETE_USER_FAILURE'],
    promise: deleteUser(user),
  };
}

export function updateUserRequire() {
  return {
    type: 'UPDATE_USER_REQUIRE',
  };
}

export function updateUserAdminAction(user, admin) {
  return {
    type: 'PROMISE',
    actions: ['UPDATE_USER_ADMIN_LOADING', 'UPDATE_USER_ADMIN_LOADED', 'UPDATE_USER_ADMIN_FAILURE'],
    promise: updateUserAdmin(user, admin),
  };
}
