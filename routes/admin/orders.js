var router = require('express').Router(),
    models = require('../../models/order');

router.route('/')
  .get(function (req, res, next) {
    models.Order.findAll().then(function(orders) {
      res.render('orders/index', {
        orders: orders
      });
    });
  })

router.route('/:id')
  .get(function (req, res, next) {
    models.Order.findById(req.params.id).then(function(order) {
      res.render('orders/show', {
        order: order
      });
    });
  });

module.exports = router;
