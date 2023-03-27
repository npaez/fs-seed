// modules
import {
  Router
} from 'express';

// controller
import {
  testing
} from '../controllers';

// middlewares
import {
  rateLimiter
} from '../lib/middlewares/limiter.middleware';

import {
  jwtAuth
} from '../lib/middlewares/auth.middleware';

// routing /
const router = Router();
router.get('/', rateLimiter, testing.home);
router.get('/private', rateLimiter, jwtAuth, testing.homePrivate);

// export
export default router;