import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';

export function getDefaultSettings() {
  const url = '/api/setting/default';
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((r) => r.json());
}

export function getLdapSetting() {
  const url = '/api/setting/ldap';
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

export function setLdapSetting(ldap) {
  const url = '/api/setting/ldap';
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cookie.load('user').token,
    },
    body: JSON.stringify({ ldap: ldap }),
  })
  .then((r) => r.json());
}

export function testLdapSetting(test) {
  const url = '/api/setting/test_ldap';
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: cookie.load('user').token,
    },
    body: JSON.stringify({ test: test }),
  })
  .then((r) => r.json());
}
