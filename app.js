'use strict';

/**
 * Module dependencies
 */

require('dotenv').config();

const join = require('path').join;
const express = require('express');
const mysql = require('mysql');
const passport = require('passport');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const less = require('less-middleware');
const db = require('./config/config');

const app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

// public
//app.use(favicon(join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

// set up session
app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: true,
  maxAge: new Date(Date.now() + 3600000)
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// main routes
app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));
app.get('/', function (req, res) {
  res.redirect('/admin/dashboard');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
