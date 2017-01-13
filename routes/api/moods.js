var router = require('express').Router(),
    models = require('models/index');

router.get('/', function(req, res) {
  models.Mood.findAll().then(function(moods) {
    res.status(200).json(moods);
  });
});

router.get('/:id', function(req, res) {
  models.Mood.findById(req.params.id).then(function(moods) {
    res.json(moods);
  });
});

module.exports = router;
