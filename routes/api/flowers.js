var router = require('express').Router(),
    models = require('../../models');

router.get('/', function(req, res) {
    models.Flower.findAll().then(function(flowers) {
      res.json(flowers);
    });
  });

router.get('/:id', function(req, res) {
  models.Flower.findById(req.params.id).then(function(flowers) {
    res.json(flowers);
  });
});

module.exports = router;
