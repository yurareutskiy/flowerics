var router = require('express').Router(),
    models = require('models');

router.get('/', function (req, res, next) {
  models.User.findAll().then(function(users) {
    res.render('users/index', {
      users: users
    });
  });
});

router.get('/:id', function (req, res, next) {
  models.User.findById(req.params.id).then(function(user) {
    res.render('users/show', {
      user: user
    });
  });
});

module.exports = router;
