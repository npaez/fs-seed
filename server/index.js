'use strict';

const database = require('./loaders/mongodb');
const server = require('./loaders/server')();
const errHandler = require('./loaders/errorHandler');

(async () => {
  // init db
  await database.start();
  // create/init server
  server.create();
  await server.start();
  // init error handler
  errHandler.start();
})();