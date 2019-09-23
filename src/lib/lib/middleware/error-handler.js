const initErrorHandler = server => {
  // eslint-disable-line no-unused-vars
  server.use((err, req, res) => {
    console.error(err);
    res.status(500).end();
  });
};

module.exports = { initErrorHandler };
