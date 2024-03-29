const express = require('express');
const { routes } = require('../app');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const moduleController = require('../controllers/moduleController');

router.get('/create', ensureAuthenticated, function (req, res) {
    res.render('pages/create-module');
});

router.post('/create', ensureAuthenticated, moduleController.createModule);

router.get('/:id/delete', ensureAuthenticated, moduleController.deleteModule);

router.get('/educator/:id', ensureAuthenticated, moduleController.getSpecificModules, function(req, res, next) {
    const modules = res.locals.educatorModules;
    res.render('pages/educator-modules', { modules });
});

module.exports = router;
