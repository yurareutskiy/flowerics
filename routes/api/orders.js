var router = require('express').Router(),
    models = require('models');

router.route('/')
  .get(function(req, res, next) {
    models.Order.findAll({
      where: { userId: req.user.id },
      include: [ models.Bouquet ],
      order: 'createdAt DESC'
    }).then(function(orders) {
      res.json(orders);
    }).catch(function(err) {
      res.send(err);
    });
  })
  .post(function (req, res, next) {
    var order = req.body;
    models.Order.create(order).then(function(order) {
      res.status(201).json(order);
    }).catch(function(err) {
      res.status(422).send(err);
    })
  });

router.get('/:id', function (req, res, next) {
  models.Order.findById(req.params.id).then(function(order) {
    res.json(order);
  }).catch(function(err) {
    res.send(err);
  });
});

module.exports = router;
