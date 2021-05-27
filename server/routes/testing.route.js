// controller
const { testing } = require('../controllers');

// middlewares
const { rateLimiter } = require('../lib/middlewares/limiter.middleware');
const { jwtAuth } = require('../lib/middlewares/auth.middleware');

module.exports = (application) => {
  application
  .route('/')
  .get(rateLimiter, testing.home)

  application
  .route('/private')
  .get(rateLimiter, jwtAuth, testing.homePrivate)
};