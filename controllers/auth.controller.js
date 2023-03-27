// libs
import {
  jwt
} from '../lib/utils/jwt.util';

export const localAuth = async (req, res) => {
  let token = null;

  try {
    token = jwt.create(req.user);
  } catch (ex) {
    console.log('[POST /auth/login localAuth() ex] ', ex);

    return res.failure(-1, ex.message, 500);
  };

  return res.success(token, 200);
};