const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const dashboardController = require('../controllers/dashboardController');

/* GET add course page */
router.get('/add', ensureAuthenticated, function(req, res, next){
    res.render('pages/create-course');
});

/* POST add course page */
router.post('/add', ensureAuthenticated, dashboardController.create);

/* GET <course title> page */
router.get('/edit/:courseId', ensureAuthenticated, dashboardController.getOneCourse);

router.post('/edit/:courseId', ensureAuthenticated, dashboardController.addUnit, function(req, res, next) {
    res.redirect('/');
});

module.exports = router;
