import { createAction, handleActions } from 'redux-actions';
import { reducerMethods } from './utils';

export const replaceAppLoading = createAction('REPLACE_APP_LOADING');

export const defaultState = {
  appLoading: true,
};

export const reducer = handleActions(
  {
    [replaceAppLoading]: reducerMethods.replace('appLoading'),
  },
  defaultState,
);
