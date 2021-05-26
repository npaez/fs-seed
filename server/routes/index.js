module.exports = {
  create(application) {
    // core routes
    require('./users.route')(application)
    require('./auth.route')(application)
    // testing route
    require('./testing.route')(application)
  }
};