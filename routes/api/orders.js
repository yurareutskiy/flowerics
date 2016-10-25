var router = require('express').Router(),
    models = require('../../models');

router.get('/', function (req, res, next) {
  models.Order.findAll({
    include: [ models.User ]
  }).then(function(orders) {
    res.json(orders);
  }).catch(function(err) {
    res.send(err);
  });
});

router.get('/:id', function (req, res, next) {
  models.Order.findById(req.params.id).then(function(order) {
    res.json(order);
  }).catch(function(err) {
    res.send(err);
  });
});

module.exports = router;
