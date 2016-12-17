var router = require('express').Router(),
    passport = require('passport'),
    User = require('../../models/user');

router.post('/auth/facebook',
  passport.authenticate('facebook-token'), function(req, res) {
    res.send(req.user? 200 : 401);
  }
);

router.post('/auth/vkontakte',
  passport.authenticate('vkontakte-token'), function(req, res) {
    res.send(req.user? 200 : 401);
  }
);

module.exports = router;
