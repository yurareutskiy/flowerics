var router = require('express').Router(),
    models = require('../../models');

router.get('/', function(req, res) {
  models.Bouquet.findAll().then(function(bouquets) {
    res.json(bouquets);
  });
});

router.get('/:id', function(req, res) {
  models.Bouquet.findById(req.params.id).then(function(bouquets) {
    res.json(bouquets);
  });
});

module.exports = router;
