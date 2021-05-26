// controller
const { users: ctrl } = require('../controllers');

// middlewares
const { rateLimiter } = require('../lib/middlewares/limiter.middleware');

module.exports = (application) => {
  application
  .route('/api/users')
  .get(rateLimiter, ctrl.getUsers)
  .post(rateLimiter, ctrl.createUser)

  application
  .route('/api/me/profile')
  .put(rateLimiter, ctrl.updateProfile)

  application
  .route('/api/me/password')
  .put(rateLimiter, ctrl.updatePassword)
};