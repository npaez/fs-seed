/* jshint esversion: 6 */
// modules
const mongoose = require('mongoose');
// models
const importModels = require('../models/index');

module.exports = {
  // connect database
  async start() {
    importModels();

    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
      });
    } catch (ex) {
      console.log(`[-] mongodb exception ${ ex.message }`);
      return process.exit(1);
    }

    return console.log(`[+] connected to mongodb - database: ${ process.env.MONGO_NAME }`);
  }
}