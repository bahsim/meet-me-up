const { POSITIONS } = require('reapop');

const config = {
  acceptedFileFormats:
    process.env.ACCEPTED_FILE_FORMATS || '.png, .jpg, .jpeg, .tiff, .gif',
  defaultAvatar:
    process.env.DEFAULT_AVATAR || '/images/content/default_avatar.png',

  port: process.env.PORT || '3000',

  authClientId:
    process.env.AUTH_CLIENT_ID || '1051db04-f240-459c-bc63-f2e5dd76cbba',
  authClientSecret:
    process.env.AUTH_CLIENT_SECRET || '2UHLSRTWMU6SI1G7M5CSGQ20SFPI47R8',
  authGrantType: process.env.AUTH_GRANT_TYPE || 'password',

  redisHost: process.env.REDIS_HOST || '0.0.0.0',
  redisPort: process.env.REDIS_PORT || '6379',
  redisSessionSecret:
    process.env.REDIS_SESSION_SECRET || '1d1f1385-384c-42a8-bf80-477e2405ba60',
  redisPassword: process.env.REDIS_PASSWORD,

  notification: {
    position: POSITIONS.bottomRight,
    closeButton: true,
    allowHTML: true,
  },

  hasTechnicalWork: process.env.HAS_TECHNICAL_WORK || 'false',
};

module.exports = config;
