import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import promisesMiddleware from './middleware/promises';

import loginReducer from './reducers/login';
import serverReducer from './reducers/server';
import userReducer from './reducers/user';
import settingsReduces from './reducers/settings';
import accountReducers from './reducers/account';

const reducer = combineReducers({
  login: loginReducer,
  server: serverReducer,
  user: userReducer,
  settings: settingsReduces,
  account: accountReducers,
});

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(promisesMiddleware,
//  logger
)(createStore);
const store = createStoreWithMiddleware(reducer, {
    login: {},
    server: {
      updateRequre: false,
      all: [],
      info: {
        servers: [],
      },
    },
    user: {
      all: [],
      ldap: {},
      test_result: {},
    },
    settings: {
      loaded: false,
    },
    account: {
      my: {
        perm: [],
      },
    },
  },
);

export default store;
