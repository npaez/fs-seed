// services
const {
  users,
  admins
} = require('../services');

/**
 * query users
 * @route GET /api/users
 */
exports.getUsers = async (req, res) => {
  const { id } = req.query;

  // query user by id
  if (!!id) {
    try {
      const user = await users.getById(id);
      return res.success(user, 200);
    } catch (ex) {
      console.log('[GET /api/users getUsers() 1] ', ex.message);
      return res.failure(-1, ex.message, 500);
    }
  }

  // query all users
  try {
    const all = await admins.getAllUsers();
    return res.success(all, 200);
  } catch (ex) {
    console.log('[GET /api/users getUsers() 2] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * create user
 * @route POST /api/users
 */
exports.createUser = async (req, res) => {
  try {
    const user = await users.create(req.body);
    return res.success(user, 200);
  } catch (ex) {
    console.log('[POST /api/users createUser()] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * get own profile info
 * @route GET /api/me/profile
 */
exports.getProfile = async (req, res) => {
  const { sub } = req.user;

  try {
    const user = await users.getById(sub);
    return res.success(user, 200);
  } catch (ex) {
    console.log('[GET /api/me/profile] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }
}

/**
 * user update own profile
 * @route PUT /api/me/profile
 */
exports.updateProfile = async (req, res) => {
  const { sub } = req.user;

  try {
    const user = await users.updateProfile(sub, req.body);
    return res.success(user, 200);
  } catch (ex) {
    console.log('[PUT /api/me/profile updateProfile()] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * user updates own password
 * @route PUT /api/me/password
 */
exports.updatePassword = async (req, res) => {
  const { sub } = req.user;

  try {
    const success = await users.updatePassword(sub, req.body.oldPassword, req.body.newPassword);
    return res.success(success, 200);
  } catch (ex) {
    console.log('[PUT /api/me/password updatePassword()] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }
};