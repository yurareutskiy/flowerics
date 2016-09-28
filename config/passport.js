var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    VKontakteStrategy = require('passport-vkontakte').Strategy,
    models = require('../models'),
    flash = require('connect-flash'),
    configAuth = require('./auth.js');

passport.serializeUser(function(admin, done) {
  done(null, admin.id);
});

passport.deserializeUser(function(id, done) {
  models.Admin.findById(id, function(err, admin){
    done(err, admin);
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
passport.use(new FacebookStrategy({
  clientID        : configAuth.facebookAuth.clientID,
  clientSecret    : configAuth.facebookAuth.clientSecret,
  callbackURL     : configAuth.facebookAuth.callbackURL,
  profileFields: ['id', 'displayName', 'email']
},

function(token, refreshToken, profile, done) {
  process.nextTick(function() {
    // find the user in the database based on their facebook id
    models.User.findOne({ where: { 'facebook.id' : profile.id }}).then(function(user) {
      // if the user is found, then log them in
      if (user) {
        return done(null, user);
      }
      else {
        // if there is no user found with that facebook id, create them
        var newUser = new User();

        // set all of the facebook information in our user model
        newUser.facebook.id    = profile.id;
        newUser.facebook.token = token;
        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
        newUser.facebook.email = profile.emails[0].value;

        // save our user to the database
        newUser.save(function(err) {
          if (err)
              throw err;
          // if successful, return the new user
          return done(null, newUser);
        });
      }
    });
  });
}));

// VKONTAKTE
passport.use(new VKontakteStrategy({
    clientID:     configAuth.vkontakteAuth.clientID,
    clientSecret: configAuth.vkontakteAuth.clientSecret,
    callbackURL:  configAuth.vkontakteAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    models.User.findOrCreate({ where: { vkontakteId: profile.id }}).then(function (err, user) {
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

