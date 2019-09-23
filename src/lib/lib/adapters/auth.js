import axios from 'axios';
// import config from '../config';
import { handleError } from '../handle-error';

function makeRequest({ method, url }) {
  if (method === 'get') {
    return params => axios.get(url, { params });
  }

  if (method === 'post') {
    return body => axios
      .post(url, body)
      .then(res => res.data)
      .catch(handleError);
  }

  if (method === 'put') {
    return (body, params) => axios
      .put(url, body, { params })
      .then(res => res.data)
      .catch(handleError);
  }
}

export const login = makeRequest({ method: 'post', url: '/auth/token' });
export const checkToken = makeRequest({
  method: 'get',
  url: '/auth/check-token',
});
export const getUserInfoByAccessToken = makeRequest({
  method: 'get',
  url: '/auth/agg/userinfo',
});
