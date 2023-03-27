// models
import {
  users
} from '../models';

/**
 * @param { String } lean
 * @returns users recordset
 */
export const getAllUsers = async (lean = true) => {
  return await users
    .find()
    .lean(lean)
    .exec();
};

/**
 * @param { String } id
 * @returns boolean 
 */
export const deleteUser = async (
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