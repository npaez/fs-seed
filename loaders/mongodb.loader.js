// modules
import mongoose from 'mongoose';

// connect database
export const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  } catch (ex) {
    console.log(`[-] mongodb exception ${ ex.message }`);

    return process.exit(1);
  };

  return console.log(`[+] connected to mongodb - database: ${ process.env.MONGO_NAME }`);
};