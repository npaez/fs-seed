// modules
const router = require('express').Router();

// controller
const { auth } = require('../controllers');

// middlewares
const { localAuth } = require('../lib/middlewares/auth.middleware');
const { rateLimiter } = require('../lib/middlewares/limiter.middleware');

// routing /auth
router.post('/login', rateLimiter, localAuth, auth.localAuth);

module.exports = router;