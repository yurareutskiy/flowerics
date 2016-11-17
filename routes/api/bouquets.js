var router = require('express').Router(),
    models = require('../../models');

router.get('/', function(req, res) {
  models.Bouquet.findAll({
    attributes: [
      'id', 'name', 'price', 'description', 'color',
      'image', 'icon', 'createdAt', 'updatedAt'
    ]
  }).then(function(bouquets) {
    res.json(bouquets);
  });
});

router.get('/:id', function(req, res) {
  models.Bouquet.findById(req.params.id).then(function(bouquets) {
    res.json(bouquets);
  });
});

module.exports = router;
