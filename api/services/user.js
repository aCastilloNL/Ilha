const bcrypt = require('bcryptjs');
const User = require('../models/user');
const getSignedToken = require('../util/signedToken');

async function registerUser(payload) {
  return User.find({ email: payload.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        throw new Error(
          'This e-mail has already been registered to an account.'
        );
      }
      if (payload.email.length === 0) {
        throw new Error('E-mail field is required.');
      }
      if (payload.password.length < 6 || payload.password.length > 14) {
        throw new Error('Password length must be between 6 and 14 characters.');
      }
      if (
        !payload.email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        throw new Error('Must be a valid e-mail address.');
      }
      return bcrypt
        .hash(payload.password, 10)
        .then((hashed) => {
          const newUser = new User({
            firstname: payload.firstname,
            lastname: payload.lastname,
            email: payload.email,
            password: hashed,
            roles: [payload.isTeacher ? 'teacher' : 'student'],
          });
          return newUser.save();
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    });
}

function signInUser(payload) {
  return User.findOne({ email: payload.email })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error('Incorrect E-mail');
      } else {
        const username = user.firstname;
        const role = user.roles[0];
        return bcrypt
          .compare(payload.password, user.password)
          .then((res) => {
            if (res) {
              const token = getSignedToken(user._id);
              const userId = user._id;
              return { token, username, userId, role };
            } else {
              throw new Error('Invalid Password');
            }
          })
          .catch((err) => {
            throw new Error(err.message);
          });
      }
    });
}

module.exports = { registerUser, signInUser };
