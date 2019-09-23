const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const config = require('./src/lib/lib/config');
const { initSession } = require('./src/lib/lib/session');
const { proxyAuthMiddleware } = require('./src/lib/lib/middleware/proxy-auth');
const { deleteTokenInfo } = require('./src/lib/lib/session');

const app = express();
const { port } = config;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(morgan('combined'));
app.use(express.static('dist'));
app.use('/statics', express.static('statics'));

initSession(app);

app.get('/logout', (req, res) => {
  deleteTokenInfo(req);
  res.redirect('/');
});

app.use(proxyAuthMiddleware());

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});
app.listen(port, () => console.log(`App started successfully on port ${port} ...`),
);
