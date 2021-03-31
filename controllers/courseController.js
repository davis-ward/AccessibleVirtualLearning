const db = require('../models');
const Course = db.Course;

const courseController = {
    create(req, res) {
        const { title, ageGroup, description, task } = req.body;
        const userId = req.user.userId;

        let errors = [];

        if (!title || !ageGroup || !description || !task) {
            errors.push({ msg: 'Please fill in all fields' });
        } else {
            // validation has passed
            const newCourse = {
                title: title,
                ageGroup: ageGroup,
                description: description,
                task: task,
                userId: userId,
            };
            
            // add the new course to the database
            Course.create(newCourse)
                .then(function () {
                    console.log('New Course was added to the database.');
                    req.flash(
                        'success_msg',
                        'Your course was succesfully created.'
                    );
                    res.redirect('/courses/create-course');
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
    },
};

module.exports = courseController;
