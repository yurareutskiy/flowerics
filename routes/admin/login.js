var router = require('express').Router(),
    Admin = require('../../models/admin'),
    passport = require('passport');

router.route('/')
  .get(function (req, res) {
    res.render('login/index', {
      'message' : req.flash('message'),
      'admin' : req.admin
    });
  })
  .post(passport.authenticate('local', {
    successRedirect : '/admin/flowers',
    failureRedirect : '/admin/login',
    failureFlash : true
  }));

module.exports = router;
