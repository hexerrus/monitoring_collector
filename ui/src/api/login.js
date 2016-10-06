import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';

export function userLogin(login, password, type) {
  const url = '/api/user/sign_in';
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: login,
      password: password,
      type: type,
    }),
  })
  .then((r) => r.json());
}

export function userLoginCheckByCookie() {
  if (cookie.load('user') == undefined) {
    return new Promise((r, v) => {r()},).then((f) => {return {login:false}});
  } else {
     return  fetch("/api/user/check_sign",{
       method:'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         Authorization: cookie.load('user').token,
      },
      body:JSON.stringify(cookie.load('user'))
     })
    .then((r) => r.json());
  }
}
