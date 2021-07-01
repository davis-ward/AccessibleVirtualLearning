const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const models = require('./models');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const collectionsRouter = require('./routes/collections');

// Passport config
require('./config/passport')(passport);

//Sync Database
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine.')
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!")
});


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// add middleware libraries into the request handling chain
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add express session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

// add passport middleware
app.use(passport.initialize());
app.use(passport.session());

// add connect-flash middleware
app.use(flash());

// global vars for connect-flash
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// add middleware for routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/collections', collectionsRouter);

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
  res.render('pages/error');
});

module.exports = app;
