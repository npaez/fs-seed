/* jshint esversion: 6 */

// modules
const compression = require('compression');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const logger = require('morgan');
// routes
const routes = require('../routes/index');
// env config
dotenv.config();

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
    // server.use(cookieParser(process.env.MONGO_NAME));

    // response definition
    server.use((req, res, next) => {
      res.success = (data = null, status = 200) => {
        return res.status(status).send({
          success: true,
          error: null,
          data
        });
      };
    
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
    });

    // routes
    routes(server);

    // error handler
    server.use((err, req, res, next) => {
      // development error handler print stacktrace
      // production error handler no stacktraces leaked to user
      return res.status(err.status || 500).send({
        error: (process.env.NODE_ENV === 'development') ? err : {},
        message: err.message || 'Unknown Error'
      });
    });

    // catch 404 and forward to error handler
    server.use((req, res, next) => {
      return res.failure(-1, 'Not Found', 404);
    });

    return server;
  },

  async start(server) {
    server.set('port', process.env.PORT); // firing up express

    await http.createServer(server).listen(process.env.PORT);
    return console.log(`[+] ${ process.env.NAME } server listening on port ${ process.env.PORT }`);
  }
}