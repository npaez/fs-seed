/* jshint esversion: 6 */
// modules
// const bodyParser = require('body-parser');
const compression = require('compression');
// const cookieParser = require('cookie-parser');
const express = require('express');
// const favicon = require('serve-favicon');
const fs = require('fs');
const http = require('http');
const logger = require('morgan');
// const passport = require('passport');
// const path = require('path');
const helmet = require('helmet');
const dotenv = require('dotenv');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const database = require('./config/mongo');

dotenv.config(); // env config

database.connectMongo()
.then(() => {
  // create logs folder
  if (!fs.existsSync('./logs')) {
    console.log('[+] logs folder created');
    fs.mkdirSync('./logs');
  }

  // express configuration
  const app = express();

  app.set('json spaces', 2);
  app.use(logger('dev'));
   
  // error log management
  const errorLogStream = fs.createWriteStream(`${ __dirname }/logs/error.log`, { flags: 'a' });
 
  // error handling, avoiding crash
  process.on('uncaughtException', (err, req, res, next) => {
    const date = new Date();
    console.error(`+++++++ ${ date } error found, logging event +++++++ `);
    console.error(err.stack);
    errorLogStream.write(`${ date } \n ${ err.stack } \n\n`);

    return;
  });

  app.use(helmet()); // helment security lib
  
  // response definition
  app.use((req, res, next) => {
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

    next();
  });
  
  // compress middleware to gzip content
  app.use(compression());
  // app.use(favicon(`${ __dirname }/public/img/favicon.png`));
  
  // require local and social network passport
  // require('./config/passport');
  
  // view engine setup
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(cookieParser(process.env.DB_NAME));
  // 
  // app.use(session({
  //   name: process.env.DB_NAME,
  //   secret: process.env.APP_SECRET_KEY,
  //   saveUninitialized: true,
  //   resave: true,
  //   cookie: { maxAge },
  //   store: new MongoStore({
  //     url: `mongodb://localhost/${ process.env.DB_NAME }`,
  //     host: 'localhost',
  //     collection: 'sessions',
  //     autoReconnect: true,
  //     clear_interval: 3600
  //   })
  // }));
  // app.use(passport.initialize());
  // app.use(passport.session());
  
  require('./routes/index')(app); // routes
  
  // disable server banner header
  app.disable('x-powered-by');
  
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;

    next(err);
  });
  
  // error handler
  app.use((err, req, res, next) => {
    // development error handler print stacktrace
    // production error handler no stacktraces leaked to user
    return res.status(err.status || 500).send({
      error: (process.env.NODE_ENV === 'development') ? err : {},
      message: err.message || 'Unknown Error'
    });
  });
  
  // firing up express
  app.set('port', process.env.APP_PORT);

  http.createServer(app).listen(process.env.APP_PORT, () => {
    return console.log(`${ process.env.APP_NAME } server listening on port ${ process.env.APP_PORT }`);
  });
})
.catch((err) => {
  console.log(err);
  console.log('[-] error connecting database');
});