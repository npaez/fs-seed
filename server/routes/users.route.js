// modules
const router = require('express').Router();

// controller
const { users } = require('../controllers');

// middlewares
const { rateLimiter } = require('../lib/middlewares/limiter.middleware');
const { adminAccess, jwtAuth } = require('../lib/middlewares/auth.middleware');

// routing
router.get('/users', rateLimiter, adminAccess, users.getUsers);
router.post('/users', rateLimiter, adminAccess, users.createUser);

router.get('/me/profile', rateLimiter, jwtAuth, users.getProfile);
router.put('/me/profile', rateLimiter, jwtAuth, users.updateProfile);

router.put('/me/password', rateLimiter, jwtAuth, users.updatePassword);

module.exports = router;