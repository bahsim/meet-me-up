const debug = require('debug');

const authRequest = /^\/auth/;

const authDebug = debug('AUTH');
const logRequest = req => authDebug(
  'REQUEST\npath: %s\nbody:\n%O\nquery:\n%O\n',
  req.path,
  req.body,
  req.query,
);

const userInfo = {
  id: '00000000-0000-0000-0000-000000000000',
  type: 'user',
  username: 'ivanko9',
  email: 'ivan@local.host',
  first_name: 'Ivan',
  last_name: 'Ivanov',
  banned_time: '1567125438',
  updated_at: '1567125438',
  created_at: '1567125400',
};

const tokenInfo = {
  access_token: '3CU0DBTXMTA5RLVWC6FETG',
  expires_in: 7200,
  refresh_token: 'C0P7IZG9WES-N-WZUB6KYW',
  token_type: 'Bearer'
};

const proxyAuthMiddleware = () => (req, res, next) => {
  if (!authRequest.test(req.path)) {
    next();
    return;
  }

  logRequest(req);
  const authPath = req.path.replace(authRequest, '');

  if (authPath === '/token') {
    req.session.tokenInfo = tokenInfo;
    res.json(tokenInfo);
  } else if (authPath === '/check-token') {
    res.json(req.session && req.session.tokenInfo);
  } else if (req.method === 'GET') {
    res.json(userInfo);
  } else {
    next();
  }
};

module.exports = { proxyAuthMiddleware };
