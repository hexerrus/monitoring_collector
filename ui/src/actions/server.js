import { getAllServers, updateServer, createServer, deleteServer, getServersInfo, } from '../api/server';

export function getAllServersAction() {
  return {
    type: 'PROMISE',
    actions: ['SERVERS_LOADING', 'SERVERS_LOADED', 'SERVER_LOAD_FAILURE'],
    promise: getAllServers(),
  };
}

export function updateServerAction(serverObject) {
  return {
    type: 'PROMISE',
    actions: ['UPDATE_SERVER_LOADING', 'UPDATE_SERVER_LOADED', 'UPDATE_SERVER_FAILURE'],
    promise: updateServer(serverObject),
  };
}

export function createServerAction(serverObject) {
  return {
    type: 'PROMISE',
    actions: ['CREATE_SERVER_LOADING', 'CREATE_SERVER_LOADED', 'CREATE_SERVER_FAILURE'],
    promise: createServer(serverObject),
  };
}

export function deleteServerAction(serverObject) {
  return {
    type: 'PROMISE',
    actions: ['DELETE_SERVER_LOADING', 'DELETE_SERVER_LOADED', 'DELETE_SERVER_FAILURE'],
    promise: deleteServer(serverObject),
  };
}

export function getServersInfoAction(serverObject) {
  return {
    type: 'PROMISE',
    actions: ['GET_SERVERS_INFO_LOADING', 'GET_SERVERS_INFO_LOADED', 'GET_SERVERS_INFO_FAILURE'],
    promise: getServersInfo(),
  };
}
