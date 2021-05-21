/* jshint esversion: 6 */

// modules
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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

  // role: String,

  // personal info
  name: String,
  lastname: String
}, {
  collection: 'users'
});

function schemaValidation(error, doc, next) {
  switch (error.name) {
    case 'ValidationError': {
      const errors = Object.keys(error.errors).map((key) => {
        return error.errors[key].message;
      });

      next(new Error(errors.join('. ')));
      break;
    }

    default: {
      next(error);
      break;
    }
  }
}

userSchema.plugin(uniqueValidator);
userSchema.post('save', schemaValidation);
userSchema.post('updateOne', schemaValidation);

module.exports = mongoose.model('users', userSchema);