const db = require('../models');
const Module = db.Module;
const User = db.User;

const moduleController = {
    createModule(req, res) {
        const { title, description, url, type } = req.body;
        const userId = req.user.userId;

        let errors = [];

        if (!title | !description | !url | !type) {
             errors.push({ msg: 'Please fill in all the fields to add a collection.' })
             res.render('pages/create-module', {errors});
        } else {
            const newModule = {
                title: title,
                type: type,
                description: description,
                url: url,
                userId: userId
            };

            Module.create(newModule)
                .then(function () {
                    console.log('New module was added to the database.');
                    req.flash(
                        'success_msg',
                        'Your module was succesfully created.'
                    );
                    res.redirect('/users/dashboard');
                })
                .catch(function (err) {
                    console.log(
                        err,
                        'Something went wrong when adding new module to the database'
                    );
                });
        }
    },

    deleteModule(req, res) {
        Module.destroy({
            where: {
                moduleId: req.params.id
            }
        }).then(function (){
            console.log(`Module ${req.params.id} was succesfully removed.`);
            req.flash(
                'success_msg',
                'Your module was successfuly deleted.'
            );
            res.redirect('/users/dashboard');
        }).catch(function (err) {
            console.log(err);
        });
    },

    getEducatorModules(req, res, next) {
        const userId = req.user.userId;
        Module.findAll({
            where: {
                userId: userId
            },
            include: User
        }).then(function(modules) {
            console.log('success');
            res.locals.educatorModules = modules;
            next();
        }).catch(function (err) {
            console.log(err);
        });
    },

    getAllModules(req, res, next) {
        Module.findAll({
            include: User
        }).then(function(modules) {
            console.log('success');
            res.locals.allModules = modules;
            next();
        }).catch(function (err) {
            console.log(err);
        });
    }
};

module.exports = moduleController;