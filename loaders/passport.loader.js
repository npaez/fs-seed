// modules
import passport from 'passport';

import {
  ExtractJwt as ExtractJWT,
  Strategy as JwtStrategy
} from 'passport-jwt';

import {
  Strategy as LocalStrategy
} from 'passport-local';

// services
import {
  users
} from '../services';

const create = () => {
  // local strategy
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (username, password, done) => {
    const user = await users.getByField({ email: username }, false);

    if (!user || !await user.comparePassword(password)) {
      return done(null, false, { error: 'wrong email or password'});
    }

    return done(null, user);
  }));
  
  // jwt strategy
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }, async (jwt_payload, done) => {
    if (await users.getById(jwt_payload.sub)) {
      return done(null, jwt_payload);
    }

    return done(null, false);
  }));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  return true;
};

const start = (server) => {
  server.use(passport.initialize());
  return true;
};

// export module
export default {
  create,
  start
};