var router = require('express').Router(),
    Mood = require('../../models/mood');

router.route('/')
  .get(function (req, res, next) {
    Mood.getMoods(function(err, moods) {
      if (err) {
       res.send(err);
      }
      res.render('moods/index', {
        'moods' : moods
      });
    });
  })
  .post(function (req, res, next) {
    var mood = req.body;
    Mood.createMood(mood, function(err, mood) {
      if (err) {
        res.render('/', { error: res.locals.err });
      }
      res.redirect('/admin/moods');
    });
  });

router.get('/new', function(req, res) {
  res.render('moods/new');
});

router.route('/:id')
  .get(function (req, res, next) {
    Mood.getMoodById(req.params.id, function(err, mood) {
      if (err) {
        res.send(err);
      }
      res.render('moods/show', {
        'mood' : mood
      });
    });
  })
  .delete(function (req, res, next) {
    var id = req.params.id;
    Mood.removeMood(id, function(err, mood) {
      if (err) {
        res.send(err);
      }
      res.redirect('/admin/moods');
    });
  });

router.route('/:id/edit')
  .get(function (req, res, next) {
    Mood.getMoodById(req.params.id, function(err, mood) {
      if (err) {
        res.send(err);
      }
      res.render('moods/edit', {
        'mood' : mood
      });
    });
  })
  .put(function (req, res, next) {
    var id = req.params.id;
    var mood = req.body;
    Mood.updateMood(id, mood, {}, function(err, mood) {
      if (err) {
        res.send(err);
      }
      res.redirect('/admin/moods/' + mood._id);
    });
  });

module.exports = router;
