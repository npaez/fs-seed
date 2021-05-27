// controller
const { users } = require('../controllers');

// middlewares
const { rateLimiter } = require('../lib/middlewares/limiter.middleware');

module.exports = (application) => {
  application
  .route('/api/users')
  .get(rateLimiter, users.getUsers)
  .post(rateLimiter, users.createUser)

  application
  .route('/api/me/profile')
  .put(rateLimiter, users.updateProfile)

  application
  .route('/api/me/password')
  .put(rateLimiter, users.updatePassword)
};