// modules
const bcrypt = require('bcryptjs');

// models
const { users } = require('../models');

module.exports = {
  /**
   * @param { String } id
   * @param { String } lean
   * @returns user object
   */
  async getById(id, lean = true) {
    try {
      return await users.findById(id).lean(lean).exec();
    } catch (ex) {
      throw new Error(ex.message);
    }
  },

  /**
   * @param { Object } query
   * @param { String } lean
   * @returns user object
   */
  async getByField(query, lean = true) {
    try {
      return await users.findOne(query).lean(lean).exec();
    } catch (ex) {
      throw new Error(ex.message);
    }
  },

  /**
   * @param { String } password
   * @param { Object } data
   * @returns new user
   */
  async create({ password, ...data }) {
    try {
      return await new users({
        createdAt: new Date(),
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
        ...data,
      }).save();
    } catch (ex) {
      throw new Error(ex.message);
    }
  },

  /**
   * @param { String } id
   * @param { Object } data
   * @returns updated user profile
   */
  async editProfile(id, data) {
    const query = { _id: id };

    const update = {
      $set: {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName
      }
    }

    const extra = {
      safe: true,
      new: true
    }

    try {
      return await users.findOneAndUpdate(query, update, extra);
    } catch (ex) {
      throw new Error(ex.message);
    }
  },

  /**
   * @param { String } id
   * @param { String } oldPassword
   * @param { String } newPassword
   * @returns boolean
   */
  async changePassword(id, oldPassword, newPassword) {
    const user = await users.findById(id).exec();

    if (!user) {
      throw new Error('user not found');
    } else if (!bcrypt.compareSync(oldPassword, user.password)) {
      throw new Error('incorrect password');
    }

    user.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10), null);

    try {
      await user.save();

      return true;
    } catch (ex) {
      throw new Error(ex.message);
    }
  }
}
