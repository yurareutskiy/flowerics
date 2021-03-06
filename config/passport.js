var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookTokenStrategy = require('passport-facebook-token'),
    VKontakteTokenStrategy = require('passport-vkontakte-token'),
    models = require('../models'),
    flash = require('connect-flash'),
    configAuth = require('./auth.js');

passport.serializeUser(function(admin, done) {
  done(null, admin.id);
});

passport.deserializeUser(function(id, done) {
  models.Admin.findById(id).then(function(admin) {
    done(null, admin);
  }).catch(function(err) {
    done(err, false);
  });
});

passport.use('local', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, login, password, done) {
    models.Admin.findOne({ where: { login: login }}).then(function(admin) {
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

// FACEBOOK
passport.use(new FacebookTokenStrategy({
    clientID:     process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    profileFields: ['id', 'name', 'email', 'picture', 'friends']
  },
  function(accessToken, refreshToken, profile, cb) {
    models.User.findOrCreate({
      where: { facebookId : profile.id }
    }).then(function(err, user) {
      return cb(err, user);
    });
  }
));

// VKONTAKTE
passport.use(new VKontakteTokenStrategy({
    clientID:     process.env.VKONTAKTE_APP_ID,
    clientSecret: process.env.VKONTAKTE_APP_SECRET,
    scope: ['email'],
    profileFields: ['id', 'name', 'email', 'contacts', 'photo_50', 'friends']
  },
  function(accessToken, refreshToken, profile, done) {
    models.User.findOrCreate({
      where: { 'vkontakte.id': profile.id }
    }).then(function (err, user) {
      return done(err, user);
    });
  }
));

var passport_local = module.exports;

module.exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/admin/login');
};

