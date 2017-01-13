var router = require('express').Router(),
    models = require('models');

router.route('/')
  .get(function (req, res, next) {
    models.Flower.findAll().then(function(flowers) {
      res.render('flowers/index', {
        flowers: flowers
      });
    });
  })
  .post(function (req, res, next) {
    var flower = req.body;
    models.Flower.create(flower).then(function(flower) {
      res.redirect('/admin/flowers');
    }).catch(function(err) {
      res.send(err);
    })
  });

router.get('/new', function(req, res) {
  res.render('flowers/new');
});

router.route('/:id')
  .get(function(req, res, next) {
    models.Flower.findById(req.params.id).then(function(flower) {
      res.render('flowers/show', {
        flower: flower
      });
    });
  })
  .delete(function(req, res) {
    var id = req.params.id;
    models.Flower.destroy({
      where: { id: id }
    }).then(function(flower) {
      res.redirect('/admin/flowers');
    }).catch(function(err) {
      res.send(err);
    });
  });

router.route('/:id/edit')
  .get(function (req, res, next) {
    models.Flower.findById(req.params.id).then(function(flower) {
      res.render('flowers/edit', {
        flower: flower
      });
    });
  })
  .put(function (req, res, next) {
    var id = req.params.id;
    models.Flower.findById(id).then(function(flower) {
      flower.update(req.body).then(function() {
        res.redirect('/admin/flowers');
      });
    });
  });

module.exports = router;
