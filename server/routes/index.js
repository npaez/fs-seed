/* jshint esversion: 6 */

module.exports = {
  create(application) {
    // core routes
    require('./users.routes')(application)
    require('./auth.routes')(application)
    require('./testing.routes')(application)
  }
}