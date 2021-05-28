// controller
const { users } = require('../controllers');

// middlewares
const { rateLimiter } = require('../lib/middlewares/limiter.middleware');
const { adminAccess, jwtAuth } = require('../lib/middlewares/auth.middleware');

module.exports = (application) => {
  // admin routes
  application
  .route('/api/users')
  .get(rateLimiter, adminAccess, users.getUsers)
  .post(rateLimiter, adminAccess, users.createUser)

  // user routes
  application
  .route('/api/me/profile')
  .get(rateLimiter, jwtAuth, users.getProfile)
  .put(rateLimiter, jwtAuth, users.updateProfile)

  application
  .route('/api/me/password')
  .put(rateLimiter, jwtAuth, users.updatePassword)
};