// controller
const { auth } = require('../controllers');

// middlewares
const { localAuth } = require('../lib/middlewares/auth.middleware');
const { rateLimiter } = require('../lib/middlewares/limiter.middleware');

module.exports = (application) => {
  application
  .route('/auth/login')
  .post(rateLimiter, localAuth, auth.localAuth)
};