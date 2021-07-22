const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');
const { ensureTypeEducator } = require('../config/auth');
const { ensureTypeStudent } = require('../config/auth');

const moduleController = require('../controllers/moduleController');
const userController = require('../controllers/userController');

// Login Page
router.get('/login', function (req, res, next) {
    res.render('pages/login');
});

router.post('/login', userController.loginUser);

// Register Page
router.get('/register', function (req, res, next) {
    res.render('pages/register');
});

router.post('/register', userController.registerUser);

router.get('/logout', ensureAuthenticated, function (req, res, next) {
    req.logout();
    req.flash('success_msg', 'You have successfully logged out.');
    res.redirect('/');
});

router.get('/dashboard', ensureAuthenticated, function (req, res) {
    if (req.user.usertype === 'educator') {
        res.redirect('/users/educators/dashboard');
    } else {
        res.redirect('/users/students/dashboard');
    }
});

router.get(
    '/students/dashboard',
    ensureAuthenticated,
    ensureTypeStudent,
    moduleController.getAllModules,
    function (req, res) {
        allModules = res.locals.allModules;
        res.render('pages/student-dashboard', { allModules });
    }
);

router.get(
    '/educators/dashboard',
    ensureAuthenticated,
    ensureTypeEducator,
    moduleController.getEducatorModules,
    moduleController.getAllModules,
    function (req, res) {
        educatorModules = res.locals.educatorModules;
        allModules = res.locals.allModules;
        res.render('pages/educator-dashboard', { educatorModules, allModules });
    }
);

router.get('/home', ensureAuthenticated, function (req, res, next) {
    res.render('pages/index-private');
});

router.get('/educators', ensureAuthenticated, userController.getEducators, function(req, res, next) {
    const educators = res.locals.educators;
    res.render('pages/educators', { educators });
});

module.exports = router;
