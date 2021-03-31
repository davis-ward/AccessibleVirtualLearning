const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");
const User = db.User;

const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // match user
      User.findOne({ where: { email: email } })
        .then((user) => {
          console.log(user);
          if (!user) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }

          // match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              console.log("IS A MATCH");
              return done(null, user);
            } else {
              return done(null, false, { message: "Password is incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.userId);
  });

  passport.deserializeUser(function (userId, done) {
    User.findOne({ where: { userId: userId } }).then((user) => {
      return done(null, user);
    });
  });
};
