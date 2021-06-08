// modules
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// callbacks/methods
const {
  handleHashPassword,
  handleSchemaValidation,
  handleComparePassword
} = require('./users.aux');

// schema definition
const userSchema = new mongoose.Schema({
  // system usage
  createdAt: {
    type: Date,
    default: new Date()
  },

  updatedAt: Date,
  creationMethod: String,

  deleted: {
    default: false,
    type: Boolean
  },

  // user info
  username: {
    type: String,
    trim: true,
    required: 'Username is required',
    unique: 'Username not availeable',
    uniqueCaseInsensitive: true
  },

  email: {
    type: String,
    trim: true,
    required: 'Email is required',
    unique: 'Email not availeable',
    lowercase: true,
    uniqueCaseInsensitive: true
  },

  password: {
    type: String,
    required: 'Password is required',
  },

  role: {
    type: String,
    enum: [ 'user', 'admin' ],
    default: 'user'
  },

  // personal info
  firstName: String,
  lastName: String
}, {
  collection: 'users'
});

// plugins
userSchema.plugin(uniqueValidator);

// methods
userSchema.methods.comparePassword = handleComparePassword;

// pre processing
userSchema.pre('save', handleHashPassword);
userSchema.pre('updateOne', handleHashPassword);

// post processing
userSchema.post('save', handleSchemaValidation);
userSchema.post('updateOne', handleSchemaValidation);

module.exports = mongoose.model('users', userSchema);