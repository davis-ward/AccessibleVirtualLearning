const db = require('../models');
const Course = db.Course;

const courseController = {
    create(req, res) {
        const { title, ageGroup, description } = req.body;
        const userId = req.user.userId;
        let errors = [];

        if (!title || !ageGroup || !description) {
            console.log('true')
            errors.push({ msg: 'Please fill in all fields' });
            res.render('pages/create-course', { errors })
        } else {
            // validation has passed
            const newCourse = {
                title: title,
                ageGroup: ageGroup,
                description: description,
                userId: userId
            };
            
            // add the new course to the database
            Course.create(newCourse)
                .then(function () {
                    console.log('New Course was added to the database.');
                    req.flash(
                        'success_msg',
                        'Your course was succesfully created. Add units and items by clicking on the course below.'
                    );
                    res.redirect('/users/dashboard');
                })
                .catch(function (err) {
                    console.log(
                        err,
                        'Something went wrong when adding new Course to database'
                    );
                });
        }
    },

    myCourses(req, res, next) {
        Course.findAll({
            where: {
                userId: req.user.userId,
            },
        }).then(function (courses) {
            req.courses = courses;
            next();
        });
    }
};

module.exports = courseController;
