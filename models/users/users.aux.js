// modules
import bcrypt from 'bcryptjs';

// const
const HANDLE_CALLER = {
  UPDATE_HOOK: {
    updatedAt: new Date(),
  },

  CREATE_HOOK: {
    createdAt: new Date()
  }
}

export const handleSchemaValidation = (error, doc, next) => {
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
};

export const handleHashPassword = async function (next, options) {
  this.set({
    password: await bcrypt.hash(
      this.password,
      bcrypt.genSaltSync(10),
      null
    ),

    ...HANDLE_CALLER[options.caller]
  });

  return next();
};

export const handleComparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};