var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Admin = require('../models/admin'),
    flash = require('connect-flash');

passport.serializeUser(function(admin, done) {
  done(null, admin.id);
});

passport.deserializeUser(function(id, done) {
  Admin.findById(id, function(err, admin){
    done(err, admin);
  });
});

passport.use('local', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, login, password, done) {
    Admin.findOne({ login: login }, function(err, admin) {
      if (err) { return done(err); }
      if (!admin) {
        return done(null, false, req.flash('message', 'Неправильный логин'));
      }
      if (password !== admin.password) {
        return done(null, false, req.flash('message', 'Неправильный пароль'));
      }
      return done(null, admin);
    });
  }
));

var passport_local = module.exports;

module.exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/admin/login');
};

