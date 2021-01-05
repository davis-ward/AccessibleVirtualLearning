var express = require('express');
var router = express.Router();

const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;

const bcrypt = require('bcryptjs');


// Login Page
router.get('/login', function(req, res, next) {
    res.render('pages/login')
});


// Register Page
router.get('/register', function(req, res, next) {
    res.render('pages/register');
});

router.post('/register', function(req, res, next) {
    //console.log(req.body);
    const { firstname, lastname, email, password, usertype} = req.body;

    // simple validation checks
    let errors = [];
    // check required fields
    if (!firstname || !lastname || !email || !password || !usertype) {
        errors.push({msg: 'Please fill in all fields'});
    }

    // check password length
    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters'});
    }

    if (errors.length > 0) {
        res.render('pages/register', {errors, firstname, lastname, email, usertype});
    } else {
        // validation has passed
        console.log('validation has passed.');

        User.findOne({
            where: {email: email}
        }).then(function(user) {
            console.log(user);

            // save the new user to the database if they don't already exist
            if (!user) {

            // create a new user
            const newUser = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                usertype: usertype
            }

            console.log(newUser);

            // hash the password
            bcrypt.genSalt(10 , (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;

                newUser.password = hash;
                
                // add the new user to the database
                User.create(newUser).then(function() {
                    console.log('New User was added to the database.');
                    res.redirect('/users/login');
                }).catch(function(err) {
                    console.log(err, 'Something went wrong when adding new User to database');
                });
            }));

            } else {
            console.log('User with same email already exist');
            errors.push({msg: 'Email is already registered'});
            res.render('pages/register', {errors, firstname, lastname, email, usertype});
            }
        });




    }


});

module.exports = router;
