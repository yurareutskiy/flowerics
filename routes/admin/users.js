var router = require('express').Router(),
    User = require('../../models/user');

router.route('/')
  .get(function (req, res, next) {
    User.getUsers(function(err, users) {
      if (err) {
       res.send(err);
      }
      res.render('users/index', {
        'users' : users
      });
    });
  });

router.route('/:id')
  .get(function (req, res, next) {
    User.getUserById(req.params.id, function(err, user) {
      if (err) {
        res.send(err);
      }
      res.render('users/show', {
        'user' : user
      });
    });
  });

module.exports = router;
