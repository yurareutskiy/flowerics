var router = require('express').Router(),
    models = require('models');

router.route('/')
  .get(function (req, res, next) {
    models.Mood.findAll().then(function(moods) {
      res.render('moods/index', {
        moods: moods
      });
    });
  })
  .post(function (req, res, next) {
    var mood = req.body;
    models.Mood.create(mood).then(function(mood) {
      res.redirect('/admin/moods');
    }).catch(function(err) {
      res.send(err);
    })
  });

router.get('/new', function(req, res) {
  res.render('moods/new');
});

router.route('/:id')
  .get(function(req, res, next) {
    models.Mood.findById(req.params.id).then(function(mood) {
      res.render('moods/show', {
        mood: mood
      });
    });
  })
  .delete(function(req, res) {
    var id = req.params.id;
    models.Mood.destroy({
      where: { id: id }
    }).then(function(mood) {
      res.redirect('/admin/moods');
    }).catch(function(err) {
      res.send(err);
    });
  });

router.route('/:id/edit')
  .get(function (req, res, next) {
    models.Mood.findById(req.params.id).then(function(mood) {
      res.render('moods/edit', {
        mood: mood
      });
    });
  })
  .put(function (req, res, next) {
    var id = req.params.id;
    models.Mood.findById(id).then(function(mood) {
      mood.update(req.body).then(function() {
        res.redirect('/admin/moods');
      });
    });
  });

module.exports = router;
