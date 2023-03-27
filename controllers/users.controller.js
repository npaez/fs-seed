// services
import {
  users,
  admins
} from '../services';

/**
 * query users
 * @route GET /api/users
 */
export const getUsers = async (req, res) => {
  const {
    id
  } = req.query;

  // query user by id
  if (!!id) {
    try {
      const user = await users.getById(id);

      return res.success(user, 200);
    } catch (ex) {
      console.log('[GET /api/users getUsers() 1] ', ex.message);

      return res.failure(-1, ex.message, 500);
    };
  }

  // query all users
  try {
    const all = await admins.getAllUsers();

    return res.success(all, 200);
  } catch (ex) {
    console.log('[GET /api/users getUsers() 2] ', ex.message);

    return res.failure(-1, ex.message, 500);
  };
};

/**
 * create user
 * @route POST /api/users
 */
export const createUser = async (req, res) => {
  try {
    const user = await users.create(req.body);

    return res.success(user, 200);
  } catch (ex) {
    console.log('[POST /api/users createUser()] ', ex.message);

    return res.failure(-1, ex.message, 500);
  };
};

/**
 * get own profile info
 * @route GET /api/me/profile
 */
export const getProfile = async (req, res) => {
  try {
    const user = await users.getById(req.user.sub);

    return res.success(user, 200);
  } catch (ex) {
    console.log('[GET /api/me/profile] ', ex.message);

    return res.failure(-1, ex.message, 500);
  };
};

/**
 * user update own profile
 * @route PUT /api/me/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const user = await users.updateProfile(
      req.user.sub,
      req.body
    );

    return res.success(user, 200);
  } catch (ex) {
    console.log('[PUT /api/me/profile updateProfile()] ', ex.message);

    return res.failure(-1, ex.message, 500);
  };
};

/**
 * user updates own password
 * @route PUT /api/me/password
 */
export const updatePassword = async (req, res) => {
  try {
    const success = await users.updatePassword(
      req.user.sub,
      req.body.oldPassword,
      req.body.newPassword
    );

    return res.success(success, 200);
  } catch (ex) {
    console.log('[PUT /api/me/password updatePassword()] ', ex.message);

    return res.failure(-1, ex.message, 500);
  };
};