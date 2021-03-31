const express = require("express");
const router = express.Router();

const db = require("../models");
const User = db.User;

const bcrypt = require("bcryptjs");
const passport = require("passport");

const { ensureAuthenticated } = require("../config/auth");

// Login Page
router.get("/login", function (req, res, next) {
  res.render("pages/login");
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Register Page
router.get("/register", function (req, res, next) {
  res.render("pages/register");
});

router.post("/register", function (req, res, next) {
  //console.log(req.body);
  const { firstname, lastname, email, password, usertype } = req.body;

  // simple validation checks
  let errors = [];
  // check required fields
  if (!firstname || !lastname || !email || !password || !usertype) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("pages/register", {
      errors,
      firstname,
      lastname,
      email,
      usertype,
    });
  } else {
    // validation has passed
    console.log("validation has passed.");

    User.findOne({
      where: { email: email },
    }).then(function (user) {
      console.log(user);

      // save the new user to the database if they don't already exist
      if (!user) {
        // create a new user
        const newUser = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          usertype: usertype,
        };

        // hash the password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            console.log(newUser);

            // add the new user to the database
            User.create(newUser)
              .then(function () {
                console.log("New User was added to the database.");
                req.flash(
                  "success_msg",
                  "You are now registered. Please log into your account!"
                );
                res.redirect("/users/login");
              })
              .catch(function (err) {
                console.log(
                  err,
                  "Something went wrong when adding new User to database"
                );
              });
          })
        );
      } else {
        console.log("User with same email already exist");
        errors.push({ msg: "Email is already registered" });
        res.render("pages/register", {
          errors,
          firstname,
          lastname,
          email,
          usertype,
        });
      }
    });
  }
});

router.get("/logout", ensureAuthenticated, function (req, res, next) {
  req.logout();
  req.flash("success_msg", "You have successfully logged out.");
  res.redirect("/users/login");
});

router.get("/dashboard", ensureAuthenticated, function (req, res, next) {
    res.render("pages/dashboard");
});

module.exports = router;
