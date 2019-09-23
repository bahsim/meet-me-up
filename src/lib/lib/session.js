const session = require('express-session');
const connectRedis = require('connect-redis');
const config = require('./config');

const RedisStore = connectRedis(session);

function initSession(server) {
  server.use(
    session({
      secret: config.redisSessionSecret,
      store: new RedisStore({
        host: config.redisHost,
        port: config.redisPort,
        logErrors: true,
        pass: config.redisPassword,
      }),
      saveUninitialized: false,
      resave: false,
    }),
  );
}

function deleteTokenInfo(req) {
  if (req.session.tokenInfo) {
    delete req.session.tokenInfo;
  }
}

module.exports = { initSession, deleteTokenInfo };
