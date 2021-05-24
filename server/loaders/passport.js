// modules
const passport = require('passport');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
// services
const users = require('../services/user.services');

module.exports = {
  create() {
    passport.use(new JwtStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    }, async (jwt_payload, done) => {
      if (await users.getById(jwt_payload.sub)) {
        done(null, jwt_payload);
      }

      return done(null, false);
    }));

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));

    return true;
  },

  start(server) {
    server.use(passport.initialize());
  }
}