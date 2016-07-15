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
  })
  .post(function (req, res, next) {
    var flower = req.body;
    Flower.createFlower(flower, function(err, flower) {
      if (err) {
        res.send(err);
      }
      res.json(flower);
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
  })
  .put(function (req, res, next) {
    var id = req.params.id;
    var flower = req.body;
    Flower.updateFlower(id, flower, {}, function(err, flower) {
      if (err) {
        res.send(err);
      }
      res.json(flower);
    });
  })
  .delete(function (req, res, next) {
    var id = req.params.id;
    Flower.removeFlower(id, function(err, flower) {
      if (err) {
        res.send(err);
      }
      res.json(flower);
    });
  });

module.exports = router;
