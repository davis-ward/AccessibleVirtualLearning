const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const courseController = require('../controllers/courseController');

/* GET add course page */
router.get('/add', ensureAuthenticated, function(req, res, next){
    res.render('pages/create-course');
});


/* POST add course page */
router.post('/add', ensureAuthenticated, courseController.create);

module.exports = router;
