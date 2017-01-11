var router = require('express').Router(),
    models = require('../../models');

router.route('/')
  .get(function (req, res, next) {
    models.Order.findAll({
      include: [ models.User ]
    }).then(function(orders) {
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

router.route('/:id/edit')
  .get(function (req, res, next) {
    models.Order.findById(req.params.id).then(function(order) {
      res.render('orders/edit', {
        order: order
      });
    });
  })
  .put(function (req, res, next) {
    var id = req.params.id;
    models.Order.findById(id).then(function(order) {
      order.update(req.body).then(function() {
        res.redirect('/admin/orders');
      });
    });
  });


module.exports = router;
