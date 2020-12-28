const mysql = require('mysql');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const password = process.env.PASSWORD;

//DATABASE
var connection = mysql.createConnection({
    host: 'pca.eng.auburn.edu',
    port: '3306',
    user: 'root',
    password: password,
    database: 'accessible_virtual_learning'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected.");
});

//ROUTES
app.post('/submit-register-form', (req, res) => {
    inputData = {
        
    }
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
