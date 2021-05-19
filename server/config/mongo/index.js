/* jshint esversion: 6 */
// modules
const mongoose = require('mongoose');

// require models
require('../../models/index')();

mongoose.Promise = Promise;

// connect database
exports.connectMongo = () => {
  return new Promise(async (resolve, reject) => {
    const opt = { useNewUrlParser: true, useFindAndModify: false };
    const uri = `mongodb://127.0.0.1/${ process.env.DB_NAME }`;
  
    try {
      await mongoose.connect(uri, opt);
    } catch (ex) {
      console.log(`[-] mongodb exception ${ ex.message }`);
  
      return reject(false);
    }
  
    console.log('[+] connected to mongodb');
    console.log(`[+] database: ${ process.env.DB_NAME }`);

    return resolve(true);
  })
};