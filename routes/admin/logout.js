var router = require('express').Router(),
    Admin = require('models/admin');

router.route('/')
  .get(function (req, res, next) {
    req.logout();
    res.redirect('/admin/login');
  });

module.exports = router;
