// modules
const passport = require('passport');

module.exports = {
  jwtAuth(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (!!err) {
        return res.failure(-1, err, 500)
      }
  
      if (!user) {
        return res.failure(-1, info.message, 500);
      }
  
      req.logIn(user, function (err) {
        if (!!err) {
          return next(err)
        };
  
        return next();
      });
    })(req, res, next);
  },

  localAuth(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (!!err) {
        return res.failure(-1, err, 500)
      } else if (!user) {
        return res.failure(-1, info.error, 500);
      }
  
      req.logIn(user, function (err) {
        if (!!err) {
          return next(err);
        }
  
        return next();
      });
    })(req, res, next);
  }
};