// modules
import {
  Router
} from 'express';

// controller
import {
  auth
} from '../controllers';

// middlewares
import {
  localAuth
} from '../lib/middlewares/auth.middleware';

import {
  rateLimiter
} from '../lib/middlewares/limiter.middleware';

// routing /auth
const router = Router();
router.post('/login', rateLimiter, localAuth, auth.localAuth);

// export
export default router;