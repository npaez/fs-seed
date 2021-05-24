'use strict';

const {
  database,
  server,
  errorHandler
} = require('./loaders');

(async () => {
  // init db
  await database.start();

  // create/init server
  const app = server.create();
  await server.start(app);

  // init error handler
  errorHandler.start();
})();