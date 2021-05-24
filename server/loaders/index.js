/* jshint esversion: 6 */
const server = require('./server');
const database = require('./mongodb');
const errorHandler = require('./errorHandler');

module.exports = {
  server,
  database,
  errorHandler
}