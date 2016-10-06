import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';

// get Account preference
export function getAccount() {
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

// update user account show permission
export function updateAccountShow(server, show) {
  const url = '/api/account/show_account';
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cookie.load('user').token,
    },
    body: JSON.stringify({ server: server, show: show }),
  })
  .then((r) => r.json());
}

// update current user password
export function updateAccountPassword(newPassword) {
  const url = '/api/account/change_password';
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cookie.load('user').token,
    },
    body: JSON.stringify({ password: newPassword }),
  })
  .then((r) => r.json());
}
