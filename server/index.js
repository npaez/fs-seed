'use strict';

const {
  database,
  server,
  errorHandler,
  passport
} = require('./loaders');

(async () => {
  // init db
  await database.start();

  // create/init server
  const app = server.create();
  await server.start(app);

  // init error handler
  errorHandler.start();

  // init passport strategies
  passport.start();
})();