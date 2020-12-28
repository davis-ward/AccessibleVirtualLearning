var mysql = require('mysql');
const dbpassword = process.env.PASSWORD;

var connection = mysql.createConnection({
    host: 'pca.eng.auburn.edu',
    port: '3306',
    user: 'root',
    password: dbpassword,
    database: 'accessible_virtual_learning'
  });
  
  // throw error if bad connection
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected.");
  });

module.exports = connection;
