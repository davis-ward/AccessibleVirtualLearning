var createError = require('http-errors');
var express = require('express');
//var mysql = require('mysql');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');

//const password = process.env.PASSWORD;

var app = express();

// connect to mysql database
//var connection = mysql.createConnection({
//  host: 'pca.eng.auburn.edu',
//  port: '3306',
//  user: 'root',
//  password: password,
//  database: 'accessible_virtual_learning'
//});

// throw error if bad connection
//connection.connect(function(err) {
//  if (err) throw err;
//  console.log("Database connected.");
//});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// add middleware libraries into the request handling chain
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add middleware for routers
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
