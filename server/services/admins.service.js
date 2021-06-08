// models
const { users } = require('../models');

module.exports = {
  /**
   * @param { String } lean
   * @returns users recordset
   */
  async getAllUsers(lean = true) {
    return await users.find().lean(lean).exec();
  },

  /**
   * @param { String } id
   * @returns boolean 
   */
  async deleteUser(id) {
    const query = { _id: id };

    const update = {
      $set: {
        delete: true
      }
    }

    try {
      await users.updateOne(query, update);
      return true;
    } catch (ex) {
      throw new Error(ex.message);
    }
  }
}
