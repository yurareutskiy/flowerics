var router = require('express').Router(),
    models = require('../../models');

router.route('/')
  .get(function(req, res) {
    models.Bouquet.findAll({
      include: [ models.Flower, models.Mood ]
    }).then(function(bouquets) {
      res.json(bouquets);
    });
  });



router.route('/:id')
  .get(function(req, res) {
    models.Bouquet.findById(req.params.id).then(function(bouquets) {
      res.json(bouquets);
    });
  });

module.exports = router;
