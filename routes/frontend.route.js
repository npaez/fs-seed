// modules
export {
  Router
} from 'express';

// controller
import {
  frontend
} from '../controllers';

// all other GET requests not handled before will return our react app
const router = require('express').Router();
router.get('/*', frontend.client);

// exports
export default router;