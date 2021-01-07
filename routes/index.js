const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('pages/index', { firstname: req.user.firstname });
});

module.exports = router;
