var router = require('express').Router(),
    Flower = require('../../models/flower');

router.route("/")
  .get(function (req, res, next) {
    Flower.getFlowers(function(err, flowers) {
      if (err) {
       res.send(err);
      }
      res.json(flowers);
    });
  });

router.route('/:id')
  .get(function (req, res, next) {
    Flower.getFlowerById(req.params.id, function(err, flower) {
      if (err) {
        res.send(err);
      }
      res.json(flower);
    });
  });

module.exports = router;
