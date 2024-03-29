// modules
import jwt from 'jsonwebtoken';

export const create = (user) => {
  return jwt.sign({
    sub: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  }, process.env.JWT_SECRET, {
    expiresIn: 86400 // expires in 24 hours
  });
};