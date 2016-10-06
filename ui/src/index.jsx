
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import mainCss from './css/styles.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect } from 'react-router';

import store from './state';
import App from './components/main';
import LoginPage from './components/login-page';

import Application from './components/application';

import  Monitoring  from './components/app/root';
import  SignOut  from './components/sign_out';
import  Users  from './components/app/users';
import  Servers  from './components/app/servers';
import  Account  from './components/app/account';

const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={LoginPage} />
        <Route path="app" component={Application}>
          <IndexRoute component={Monitoring} />
          <Route path="users" component={Users}/>
          <Route path="servers" component={Servers}/>
          <Route path="account" component={Account}/>
        </Route>
        <Route path="sign_out" component={SignOut}/>
        <Redirect from="*" to="/" />
      </Route>
     </Router>
   </Provider>
);

ReactDOM.render(routes,
  document.getElementById('root')
);

store.subscribe(() => {
  console.log('New state:', store.getState());
});
