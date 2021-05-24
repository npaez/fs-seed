/* jshint esversion: 6 */

module.exports = (application) => {
  // core routes
  require('./users.routes')(application)
  require('./testing.routes')(application)
}