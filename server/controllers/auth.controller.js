// const users = require('../services/user.services');
const jwt = require('../lib/utils/jwt.utils');

module.exports = {
  async localAuth(req, res) {
    let token = null;

    try {
      token = jwt.create(req.user);
    } catch (ex) {
      return res.failure(-1, ex.message, 500);
    }

    return res.success(token, 200);
  }
};
