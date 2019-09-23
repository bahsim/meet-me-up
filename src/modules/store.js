import { combineReducers, createStore, applyMiddleware } from 'redux';

import { reducer as form } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { reducer as makeReapopReducer } from 'reapop';

import * as Global from './global';
import * as Auth from './auth';

const defaultState = {
  form: null,
  global: Global.defaultState,
  auth: Auth.defaultState,
  notifications: null,
};

const rootReducer = combineReducers({
  form,
  global: Global.reducer,
  auth: Auth.reducer,
  notifications: makeReapopReducer(),
});

export function makeStore(initialState = defaultState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );

  return store;
}
