var router = require('express').Router(),
    models = require('models');

router.get('/', function(req, res) {
  models.Promotion.findAll().then(function(promotions) {
    res.json(promotions);
  });
});

router.get('/:id', function(req, res) {
  models.Promotion.findById(req.params.id).then(function(promotions) {
    res.json(promotions);
  });
});

module.exports = router;
