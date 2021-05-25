/* jshint esversion: 6 */

// controller
const ctrl = require('../controllers/testing.controller');

// middlewares
const { rateLimiter } = require('../lib/middlewares/limiter.middlewares');
const { jwtAuth } = require('../lib/middlewares/auth.middlewares');

module.exports = (application) => {
  application
  .route('/')
  .get(rateLimiter, ctrl.home)

  application
  .route('/private')
  .get(rateLimiter, jwtAuth, ctrl.homePrivate)
}