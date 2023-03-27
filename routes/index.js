import auth from './auth.route';
import testing from './testing.route';
import users from './users.route';
import frontend from './frontend.route';

export const initialize = (server) => {
  // core routes
  server.use('/auth', auth);
  server.use('/api', users);

  // testing route
  server.use('/test', testing);

  // client route
  server.use('/', frontend);

  return true;
};