/* jshint esversion: 6 */

// controller
const ctrl = require('../controllers/testing');

// middlewares
const { rateLimiter } = require('../middlewares');

module.exports = (application) => {
  application
  .route('/')
  .get(rateLimiter, ctrl.home)
}