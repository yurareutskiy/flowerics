var router = require('express').Router(),
    models = require('../../models');

router.route('/')
  .get(function(req, res) {
    models.Mood.findAll().then(function(moods) {
      res.json(moods);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    models.Mood.findById(req.params.id).then(function(moods) {
      res.json(moods);
    });
  });

module.exports = router;
