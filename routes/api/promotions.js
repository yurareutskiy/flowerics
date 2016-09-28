var router = require('express').Router(),
    models = require('../../models');

router.route('/')
  .get(function(req, res) {
    models.Promotion.findAll().then(function(promotions) {
      res.json(promotions);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    models.Promotion.findById(req.params.id).then(function(promotions) {
      res.json(promotions);
    });
  });

module.exports = router;
