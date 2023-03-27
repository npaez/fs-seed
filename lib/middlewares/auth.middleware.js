// modules
import passport from 'passport';

export const jwtAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (!!err) {
      return res.failure(-1, err, 500);
    } else if (!user) {
      return res.failure(-1, info.message, 500);
    }

    req.logIn(user, (err) => {
      if (!!err) {
        return next(err);
      };

      return next();
    });
  })(req, res, next);
};

export const localAuth = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (!!err) {
      return res.failure(-1, err, 500);
    } else if (!user) {
      return res.failure(-1, info.error, 500);
    }

    req.logIn(user, (err) => {
      if (!!err) {
        return next(err);
      }

      return next();
    });
  })(req, res, next);
};

export const adminAccess = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.failure(-1, 'admin access needed', 403);
  }

  return next();
};