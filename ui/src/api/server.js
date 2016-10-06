import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';

export function getAllServers() {
  const url = '/api/server';
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cookie.load('user').token,
    },
  })
  .then((r) => r.json());
}

export function updateServer(serverObject) {
  const url = '/api/server';
  return fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cookie.load('user').token,
    },
    body: JSON.stringify(serverObject),
  })
  .then((r) => r.json());
}

export function createServer(serverObject) {
  const url = '/api/server';
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cookie.load('user').token,
    },
    body: JSON.stringify(serverObject),
  })
  .then((r) => r.json());
}

export function deleteServer(serverObject) {
  const url = '/api/server';
  return fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cookie.load('user').token,
    },
    body: JSON.stringify(serverObject),
  })
  .then((r) => r.json());
}

export function getServersInfo() {
  const url = '/api/server/info';
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cookie.load('user').token,
    },
  })
  .then((r) => r.json());
}
