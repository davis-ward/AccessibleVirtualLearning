const db = require('../models');
const Module = db.Module;

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

    getEducatorModules(req, res) {
        const userId = req.user.userId;
        Module.findAll({
            where: {
                userId: userId
            }
        }).then(function(modules) {
            console.log('success');
            res.render('pages/dashboard', {modules});
        }).catch(function (err) {
            console.log(err);
        });
    }
};

module.exports = moduleController;