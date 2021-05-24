// modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// models
const users = mongoose.model('users');

module.exports = {
  /**
   * @param { String } id
   * @returns user object
   */
  async getById(id) {
    return await users.findById(id).lean().exec();
  },

  /**
   * @returns users recordset
   */
  async getAll() {
    return await users.find().lean().exec();
  },

  /**
   * @param { Object } data
   * @param { String } password
   * @returns new user
   */
  async create({ password, ...data }) {
    const user = await new users({
      createdAt: new Date(),
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
      ...data,
    }).save();

    return user;
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

    let user = null;

    try {
      user = await users.findOneAndUpdate(query, update, extra);
    } catch (ex) {
      throw new Error(ex.message);
    }

    return user;
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
    } catch (ex) {
      throw new Error(ex.message);
    }

    return true;
  }
}
