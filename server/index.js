'use strict';

const database = require('./loaders/mongodb');
const server = require('./loaders/server')();
const errHandler = require('./loaders/errorHandler');

(async () => {
  await database.start();
  server.create();
  server.start();
  errHandler.start();
})();