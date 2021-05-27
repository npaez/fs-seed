// modules
const compression = require('compression');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const logger = require('morgan');
// routes
const routes = require('../routes/index');
// loaders
const passport = require('./passport.loader');
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

module.exports = {
  create() {
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

    if (process.env.USE_PASSPORT) {
      // create/initialize passport strategies
      passport.create();
      passport.start(server);
    }

    // response definition
    server.use(responseDefinition);
    // error handler
    server.use(errorHandler);

    // routes
    routes.create(server);

    // catch 404 and forward to error handler
    server.use((req, res) => res.failure(-1, 'not found', 404));

    return server;
  },

  async start(server) {
    server.set('port', process.env.PORT); // firing up express

    await http.createServer(server).listen(process.env.PORT);
    return console.log(`[+] ${ process.env.NAME } server listening on port ${ process.env.PORT }`);
  }
};