// modules
import {
  Router
} from 'express';

// controller
import {
  users
} from '../controllers';

// middlewares
import {
  rateLimiter
} from '../lib/middlewares/limiter.middleware';

import {
  adminAccess,
  jwtAuth
} from '../lib/middlewares/auth.middleware';

// routing
const router = Router();
router.get('/users', rateLimiter, adminAccess, users.getUsers);
router.post('/users', rateLimiter, adminAccess, users.createUser);

router.get('/me/profile', rateLimiter, jwtAuth, users.getProfile);
router.put('/me/profile', rateLimiter, jwtAuth, users.updateProfile);

router.put('/me/password', rateLimiter, jwtAuth, users.updatePassword);

// export
export default router;