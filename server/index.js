// 'use strict';

const {
  database,
  server,
  errorHandler
} = require('./loaders');

(async () => {
  // create db
  await database.start();

  // create/initialize server
  const app = server.create();
  await server.start(app);

  // create error handler
  errorHandler.create();
})();