'use strict';

const database = require('./config/mongodb');
const server = require('./config/server')();
const errHandler = require('./config/errorHandler');

(async () => {
  await database.start();
  server.create();
  server.start();
  errHandler.start();
})();