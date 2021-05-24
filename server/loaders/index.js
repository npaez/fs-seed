/* jshint esversion: 6 */
const server = require('./server');
const database = require('./mongodb');
const errorHandler = require('./errorHandler');
const passport = require('./passport');

module.exports = {
  server,
  database,
  errorHandler,
  passport
}