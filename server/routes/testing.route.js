// modules
const router = require('express').Router();

// controller
const { testing } = require('../controllers');

// middlewares
const { rateLimiter } = require('../lib/middlewares/limiter.middleware');
const { jwtAuth } = require('../lib/middlewares/auth.middleware');

// routing /
router.get('/', rateLimiter, testing.home);
router.get('/private', rateLimiter, jwtAuth, testing.homePrivate);

module.exports = router;