/* jshint esversion: 6 */
// modules
const mongoose = require('mongoose');

// require models
// require('../models/index')();

mongoose.Promise = Promise;

// connect database
module.exports = {
  async start() {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      });
    } catch (ex) {
      console.log(`[-] mongodb exception ${ ex.message }`);
      return process.exit(1);
    }

    return console.log(`[+] connected to mongodb - database: ${ process.env.MONGO_NAME }`);
  }
}