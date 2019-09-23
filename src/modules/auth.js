import { createAction, handleActions } from 'redux-actions';
import get from 'lodash/get';
import { formValueSelector } from 'redux-form';
import { reducerMethods } from './utils';
import config from '../lib/lib/config';
import { userTypes } from '../constants/userTypes';
import {
  login,
  checkToken,
  getUserInfoByAccessToken,
} from '../lib/lib/adapters/auth';

import { authorizationForm } from '../constants/forms';
import { replaceAppLoading } from './global';

export const replaceTokenInfo = createAction('REPLACE_TOKEN_INFO');
export const replaceUserInfo = createAction('REPLACE_USER_INFO');
export const replaceIsPremium = createAction('REPLACE_IS_PREMIUM');
export const replaceIsAdult = createAction('REPLACE_IS_ADULT');

export const loginUser = () => (dispatch, getState) => {
  const formSelector = formValueSelector(authorizationForm.name);
  const values = formSelector(getState(), ...authorizationForm.fields);
  // dispatch(reset(authorizationForm.name));
  dispatch(replaceAppLoading(true));
  return login({
    client_id: config.authClientId,
    client_secret: config.authClientSecret,
    grant_type: config.authGrantType,
    ...values,
  })
    .then(tokenInfo => {
      dispatch(replaceTokenInfo(tokenInfo));
      dispatch(getUser());
      setTimeout(() => dispatch(replaceAppLoading(false)), 1000);
    })
    .catch(error => {
      dispatch(replaceAppLoading(false));
      throw error;
    });
};

export const loginFromSession = () => dispatch => {
  checkToken()
    .then(({ data: tokenInfo }) => {
      dispatch(replaceTokenInfo(tokenInfo));
      dispatch(getUser());
      setTimeout(() => dispatch(replaceAppLoading(false)), 1000);
    })
    .catch(error => {
      dispatch(replaceAppLoading(false));
      throw error;
    });
};

export const getUser = () => (dispatch, getState) => {
  const accessToken = get(getState(), ['auth', 'tokenInfo', 'access_token']);
  if (!accessToken) {
    return;
  }

  let userInfo;
  let isPremium;
  return getUserInfoByAccessToken({ access_token: accessToken }).then(
    ({ data }) => {
      userInfo = data;
      isPremium = userInfo && userInfo.type === userTypes.gold;
      dispatch(replaceIsPremium(isPremium));
      return dispatch(replaceUserInfo(userInfo));
    },
  );
  // .then(() => getAvatarSrcByUserId({user_id: userInfo.id}))
  // .then(avatarSrc => {
  //   dispatch(replaceAvatarSrc(avatarSrc))
  // })
};

export const defaultState = {
  tokenInfo: null,
  userInfo: null,
  isPremium: false,
  isAdult: false,
};

export const reducer = handleActions(
  {
    [replaceTokenInfo]: reducerMethods.replace('tokenInfo'),
    [replaceUserInfo]: reducerMethods.replace('userInfo'),
    [replaceIsPremium]: reducerMethods.replace('isPremium'),
    [replaceIsAdult]: reducerMethods.replace('isAdult'),
  },
  defaultState,
);
