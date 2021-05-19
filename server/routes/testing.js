/* jshint esversion: 6 */

// controller
const { getTesting } = require('../controllers/testing');

// middlewares
const { rateLimiter } = require('../middlewares');

module.exports = (application) => {
  application
  .route('/')
  .get(rateLimiter, getTesting)
}