const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('pages/index');
});

module.exports = router;

/* GET resource page. */

router.get('/resources', ensureAuthenticated, function (req, res, next) {
    res.render('pages/resources');
});
