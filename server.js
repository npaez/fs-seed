// loaders
import {
  database,
  server,
  errorHandler
} from './loaders';

// start server function
const start = async () => {
  // create db
  await database.start();

  // create/initialize server
  const app = server.create();
  await server.start(app);

  // create error handler
  errorHandler.create();
};

export default start;