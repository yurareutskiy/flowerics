var router = require('express').Router(),
    passport = require('passport'),
    User = require('../../models/user');

router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['user_friends'] }),
  function(req, res){
    // The request will be redirected to vk.com for authentication, with
    // extended permissions.
  }
);

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/auth/vkontakte',
  passport.authenticate('vkontakte', { scope: ['email', 'friends'] }),
  function(req, res){
    // The request will be redirected to vk.com for authentication, with
    // extended permissions.
  }
);

router.get('/auth/vkontakte/callback',
  passport.authenticate('vkontakte', { failureRedirect: '/login' }),
    function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;
