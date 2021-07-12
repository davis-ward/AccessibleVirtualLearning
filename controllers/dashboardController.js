const db = require('../models');
const Course = db.Course;
const Unit = db.Unit;
const Task = db.Task;

const Collection = db.Collection;

const dashboardController = {
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
    },

    getOneCourse(req, res) {
        Course.findOne({
            where: {
                courseId: req.params.courseId
            }
        }).then(function (course){
            res.render('pages/edit-course', {course: course});
        });
    },

    addUnit(req, res, next) {
        let keys = Object.keys(req.body);
        // grab the unit title and description
        const unitTitle = req.body[keys[0]]
        const unitDescription = req.body[keys[1]]
        //create a new unit

        const newUnit = {
            title: unitTitle,
            description: unitDescription,
            courseId: req.params.courseId
        }

        // add new unit to the DB
        Unit.create(newUnit)
            .then(function () {
                console.log('New Unit was added to the Database.')
            }).catch(function (err) {
                console.log(
                    err,
                    'Something went wrong when adding new Course to database'
                );
            });

        // get that units id 
        console.log(newUnit.title)
        Unit.findOne({
            where: {
                title: unitTitle
            }
        }).then(function (currUnit){
            console.log(currUnit);
        });
        
        // put all the task in a list
        taskList = []
        for (let i = 2; i < keys.length; i++) {
            taskList.push(req.body[keys[i]])
        }
        let order = 1;
        for (let task of taskList) {
            let newTask = {
                task: task,
                orderBy: order,
                unitId: currUnitId
            }

            // add new task to the DB
            Task.create(newTask)
                .then(function () {
                    console.log('New Task was added to the Database.')
                }).catch(function (err) {
                    console.log(
                        err,
                        'Something went wrong when adding new Course to database'
                );
            });
            order++;
        }
        
        next()
    },

    addCollection(req, res) {
        const { title, description, url, resourceType } = req.body;
        const userId = req.user.userId;

        let errors = [];

        if (!title | !description | !url | !resourceType) {
             errors.push({ msg: 'Please fill in all the fields to add a collection.' })
             res.render('pages/create-collection', {errors});
        } else {
            const newCollection = {
                title: title,
                description: description,
                url: url,
                userId: userId
            };

            Collection.create(newCollection)
                .then(function () {
                    console.log('New Collection was added to the database.');
                    req.flash(
                        'success_msg',
                        'Your collection was succesfully created.'
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

    getMyCollections(req, res) {
        Collection.findAll({
            where: {
                userId: req.user.userId
            }
        }).then(function(collections) {
            res.redirect('/users/dashboard', collections)
        });
    }
};

module.exports = dashboardController;
