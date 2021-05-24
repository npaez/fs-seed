/* jshint esversion: 6 */

// controller
const ctrl = require('../controllers/testing.controller');

// middlewares
const { rateLimiter } = require('../lib/middlewares/limiter.middlewares');

module.exports = (application) => {
  application
  .route('/')
  .get(rateLimiter, ctrl.home)
}