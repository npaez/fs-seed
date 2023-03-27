// models
import {
  users
} from '../models';

/**
 * @param { String } lean
 * @returns users recordset
 */
const getAllUsers = async (lean = true) => {
  return await users
    .find()
    .lean(lean)
    .exec();
};

/**
 * @param { String } id
 * @returns boolean 
 */
const deleteUser = async (
  id = null
) => {
  if (!id) {
    throw new Error('unknown id');
  }

  const query = {
    _id: id
  };

  const update = {
    $set: {
      delete: true
    }
  };

  try {
    await users.updateOne(query, update);
  } catch (ex) {
    throw new Error(ex.message);
  };

  return true;
};

// export module
export default {
  getAllUsers,
  deleteUser
};