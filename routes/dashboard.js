var express = require('express');
var connection = require('../middlewares/connection');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('pages/dashboard');
});

router.post('/', function(req, res, next) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var pass = req.body.password;

    let query = "INSERT INTO users VALUES (3, '" + firstname + "', '" + lastname + "', '" + email + "', '" + pass + "')";
    console.log(query);

    connection.query(query, function(err, result){
        if(err) throw err;
            console.log("1 user inserted.");
    });
});

module.exports = router;
