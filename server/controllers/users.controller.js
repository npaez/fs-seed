// services
const { users } = require('../services');

/**
 * query users
 * @route GET /api/users
 */
exports.getUsers = async (req, res) => {
  const { id } = req.query;

  let user = null;
  let all = [];

  // query user by id
  if (!!id) {
    try {
      user = await users.getById(id);
    } catch (ex) {
      console.log('[GET /api/users getUsers() 1] ', ex.message);
      return res.failure(-1, ex.message, 500);
    }

    return res.success(user, 200);
  }

  // query all users
  try {
    all = await users.getAll();
  } catch (ex) {
    console.log('[GET /api/users getUsers() 2] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }

  return res.success(all, 200);
};

/**
 * create user
 * @route POST /api/users
 */
exports.createUser = async (req, res) => {
  console.log('[createUser() req.body] ', req.body);

  let user = null;

  try {
    user = await users.create(req.body);
  } catch (ex) {
    console.log('[POST /api/users createUser()] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }

  return res.success(user, 200);
};

/**
 * user update own profile
 * @route PUT /api/me/profile
 */
exports.updateProfile = async (req, res) => {
  const { sub } = req.user;

  let user = null;

  try {
    user = await users.updateProfile(sub, req.body);
  } catch (ex) {
    console.log('[PUT /api/me/profile updateProfile()] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }

  return res.success(user, 200);
};

/**
 * user updates own password
 * @route PUT /api/me/password
 */
exports.updatePassword = async (req, res) => {
  const { sub } = req.user;

  let success = false;

  try {
    success = await users.updatePassword(sub, req.body.oldPassword, req.body.newPassword);
  } catch (ex) {
    console.log('[PUT /api/me/password updatePassword()] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }

  return res.success(success, 200);
};