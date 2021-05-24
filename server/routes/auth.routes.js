/* jshint esversion: 6 */

// controller
const ctrl = require('../controllers/auth.controller');

// middlewares
const { localAuth } = require('../lib/middlewares/auth.middlewares');
const { rateLimiter } = require('../lib/middlewares/limiter.middlewares');

module.exports = (application) => {
  application
  .route('/auth/login')
  .post(rateLimiter, localAuth, ctrl.localAuth)
}