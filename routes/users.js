var express = require('express');
var router = express.Router();


// Login Page
router.get('/login', function(req, res, next) {
    res.send('Login');
});


// Register Page
router.get('/register', function(req, res, next) {

});

router.post('/register', function(req, res, next) {
    
});

module.exports = router;
