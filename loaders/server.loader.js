// modules
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import logger from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';

// routes
import * as routes from '../routes';

// loaders
import * as passport from './passport.loader';

// env config
dotenv.config();

const responseDefinition = (req, res, next) => {
  res.success = (data = null, status = 200) => {
    return res.status(status).send({
      success: true,
      error: null,
      data
    });
  }

  res.failure = (code = -1, message = 'Unknown Error', status = 500) => {
    return res.status(status).send({
      success: false,
      error: {
        code,
        message
      },
      data: null,
    });
  };

  return next();
};

const errorHandler = (err, req, res, next) => {
  // development error handler print stacktrace
  // production error handler no stacktraces leaked to user
  return res.status(err.status || 500).send({
    error: (process.env.NODE_ENV === 'development') ? err : {},
    message: err.message || 'Unknown Error'
  });
};

export const create = () => {
  // create express app
  const server = express();

  server.set('json spaces', 2);
  server.use(logger('dev'));
  // helment security lib
  server.use(helmet());
  // disable server banner header
  server.disable('x-powered-by');
  // compress middleware to gzip content
  server.use(compression());
  // server.use(favicon(`${ __dirname }/public/img/favicon.png`));
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  // sanitize user-supplied data
  server.use(mongoSanitize({ replaceWith: '_' }));

  if (process.env.USE_PASSPORT) {
    // create/initialize passport strategies
    passport.create();
    passport.start(server);
  }

  if (process.env.USE_CORS) {
    server.use(cors());
  }

  // response definition
  server.use(responseDefinition);
  // error handler
  server.use(errorHandler);

  // routes
  routes.initialize(server);

  // catch 404 and forward to error handler
  server.use((req, res) => res.failure(-1, 'not found', 404));

  return server;
};

export const start = async (server) => {
  server.set('port', process.env.PORT); // firing up express

  await http.createServer(server).listen(process.env.PORT);

  return console.log(`[+] ${ process.env.NAME } server listening on port ${ process.env.PORT }`);
};