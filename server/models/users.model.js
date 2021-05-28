// modules
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

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
    enum : [ 'user', 'admin' ],
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
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// post processing
userSchema.post('save', schemaValidation);
userSchema.post('updateOne', schemaValidation);

// aux functions
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

module.exports = mongoose.model('users', userSchema);