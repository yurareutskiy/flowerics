var router = require('express').Router(),
    Order = require('../../models/order');

router.route("/")
  .get(function (req, res, next) {
    Order.getOrders(function(err, orders) {
      if (err) {
       res.send(err);
      }
      res.json(orders);
    });
  });

router.route('/:id')
  .get(function (req, res, next) {
    Order.getOrderById(req.params.id, function(err, order) {
      if (err) {
        res.send(err);
      }
      res.json(order);
    });
  });

module.exports = router;
