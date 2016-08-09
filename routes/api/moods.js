var router = require('express').Router(),
    Mood = require('../../models/mood');

router.route("/")
  .get(function (req, res, next) {
    Mood.getMoods(function(err, moods) {
      if (err) {
       res.send(err);
      }
      res.json(moods);
    });
  });

router.route('/:id')
  .get(function (req, res, next) {
    Mood.getMoodById(req.params.id, function(err, mood) {
      if (err) {
        res.send(err);
      }
      res.json(mood);
    });
  });

module.exports = router;
