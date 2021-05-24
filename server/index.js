'use strict';

const {
  database,
  server,
  errorHandler,
  passport
} = require('./loaders');

(async () => {
  // create/init server
  const app = server.create();
  await server.start(app);

  // init db
  await database.start();

  // init passport strategies
  passport.create();
  passport.start(app);

  // init error handler
  errorHandler.create();
})();