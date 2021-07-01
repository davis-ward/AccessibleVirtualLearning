const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const dashboardController = require('../controllers/dashboardController');



router.get('/add', ensureAuthenticated, function(req, res, next) {
    res.render('pages/create-collection');
});


module.exports = router;