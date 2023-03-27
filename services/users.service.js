// modules
import {
  compareSync
} from 'bcryptjs';

// models
import {
  users
} from '../models';

/**
 * @param { String } id
 * @param { String } lean
 * @returns user object
 */
export const getById = async (
  id,
  lean = true
) => {
  try {
    return await users
      .findById(id)
      .lean(lean)
      .exec();
  } catch (ex) {
    throw new Error(ex.message);
  };
};

/**
 * @param { Object } query
 * @param { String } lean
 * @returns user object
 */
export const getByField = async (
  query,
  lean = true
) => {
  try {
    return await users
      .findOne(query)
      .lean(lean)
      .exec();
  } catch (ex) {
    throw new Error(ex.message);
  };
};

/**
 * @param { String } password
 * @param { Object } data
 * @returns new user
 */
export const create = async (data) => {
  try {
    const options = { caller: 'CREATE_HOOK' };

    return await new users(data).save(options);
  } catch (ex) {
    throw new Error(ex.message);
  };
};

/**
 * @param { String } id
 * @param { Object } data
 * @returns updated user profile
 */
export const editProfile = async (
  id,
  data
) => {
  const query = {
    _id: id
  };

  const update = {
    $set: {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName
    }
  };

  const extra = {
    safe: true,
    new: true
  };

  try {
    return await users.findOneAndUpdate(
      query,
      update,
      extra
    );
  } catch (ex) {
    throw new Error(ex.message);
  };
};

/**
 * @param { String } id
 * @param { String } oldPassword
 * @param { String } newPassword
 * @returns boolean
 */
export const updatePassword = async (
  id,
  oldPassword,
  newPassword
) => {
  const user = await users
    .findById(id)
    .exec();

  if (!user) {
    throw new Error('user not found');
  } else if (!compareSync(oldPassword, user.password)) {
    throw new Error('incorrect password');
  }

  try {
    const options = {
      caller: 'UPDATE_HOOK'
    };

    user.password = newPassword;

    await user.save(options);
  } catch (ex) {
    throw new Error(ex.message);
  };

  return true;
};
