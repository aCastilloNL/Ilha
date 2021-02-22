const bcrypt = require('bcryptjs');
const User = require('../models/user');
const getSignedToken = require('../util/signedToken');

async function registerUser(payload) {
    User.findOne({ email: payload.email })
        .exec((err, user) => {
            if (err) {
              throw new Error({ message: err });
            }
      
            if (user) {
              return Error({ message: 'This e-mail has already been registered to an account.'});
            }
          })
        return bcrypt
                .hash(payload.password, 10)
                .then((hashed) => {
                    const newUser = new User({
                        firstname: payload.firstname,
                        lastname: payload.lastname,
                        email: payload.email,
                        password: hashed
                    });
                    return newUser.save();
                })
                .catch((error) => {
                    throw Error(`error from user services register: ${error}`);
                })
            };

function signInUser(payload) {
    return User.findOne({ email: payload.email })
        .exec()
        .then((user) => {
            console.log([user])
            if (!user) {
                console.log(user)
                throw new Error('Incorrect E-mail');
            } else {
                return bcrypt
                .compare(payload.password, user.password)
                .then((res) => {
                    console.log(res)
                    if (res) {
                        const token = getSignedToken(user._id);
                        return token;
                    } else {
                        throw new Error('Invalid Password');
                    }
                })
                .catch((err) => {
                    throw new Error(`error from user services SignIn: ${err}`)
                });
            }
        });

}

module.exports = { registerUser, signInUser };