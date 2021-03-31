const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const courseController = require('../controllers/courseController');

/* GET create-course pages */
router.get('/create-course', ensureAuthenticated, function (req, res, next) {
    res.render('pages/create-course');
});

/* GET my-courses page */
router.get(
    '/my-courses',
    ensureAuthenticated,
    courseController.myCourses,
    function (req, res, next) {
        res.send(req.courses);
    }
);

/* POST create-course */
router.post('/create-course', ensureAuthenticated, courseController.create);

module.exports = router;
