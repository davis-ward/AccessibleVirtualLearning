var express = require('express');
var router = express.Router();

const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;


// Login Page
router.get('/login', function(req, res, next) {
    res.render('pages/login')
});


// Register Page
router.get('/register', function(req, res, next) {
    res.render('pages/register');
});

router.post('/register', function(req, res, next) {
    console.log(req.body);
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
        res.render('pages/register', {errors});
    } else {
        // validation has passed
        console.log('validation has passed.');

        // create a new User
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            usertype: req.body.usertype
        };

        // save the new User to the database
        User.create(user).then(function() {
            console.log('New User was added to the database.');
        }).catch(function(err) {
            console.log(err, 'Something went wrong when adding new User to database');
        });


    }


});

module.exports = router;
