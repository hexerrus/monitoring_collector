import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';

export function getUsers() {
  const url = '/api/user';
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

export function getUserPermission() {
  const url = '/api/account';
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

export function changeUserAvalible(user,server,avalible) {
  const url = '/api/user/avalible';
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cookie.load('user').token,
    },
    body: JSON.stringify({user: user, server: server, avalible: avalible}),
  })
  .then((r) => r.json());
}

export function changeUserShow(user,server,show) {
  const url = '/api/user/show';
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cookie.load('user').token,
    },
    body: JSON.stringify({user: user, server: server, show: show}),
  })
  .then((r) => r.json());
}

export function updateUserPassword(user,newPassword) {
  const url = '/api/user/change_password';
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cookie.load('user').token,
    },
    body: JSON.stringify({user: user, password: newPassword }),
  })
  .then((r) => r.json());
}

export function updateUserAdmin(user,newAdmin) {
  const url = '/api/user/change_admin';
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cookie.load('user').token,
    },
    body: JSON.stringify({user: user, admin: newAdmin }),
  })
  .then((r) => r.json());
}

export function deleteUser(user) {
  const url = '/api/user';
  return fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cookie.load('user').token,
    },
    body: JSON.stringify({user: user}),
  })
  .then((r) => r.json());
}
