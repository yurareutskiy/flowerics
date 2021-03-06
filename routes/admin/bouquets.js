var router = require('express').Router(),
    models = require('models'),
    multer  = require('multer'),
    mime  = require('mime');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
  }
});

var upload = multer({ storage: storage }).fields(
  [
    { name: 'image', maxCount: 3 },
    { name: 'icon', maxCount: 1 }
  ]
);

router.route('/')
  .get(function (req, res, next) {
    models.Bouquet.findAll().then(function(bouquets) {
      res.render('bouquets/index', {
        bouquets: bouquets
      });
    });
  })
  .post(upload, function (req, res, next) {
    models.Bouquet.create({
      name: req.body.name,
      description: req.body.description,
      prescription: req.body.prescription,
      price: req.body.price,
      icon: req.files['icon'][0].filename,
      color: req.body.color
    }).then(function(bouquet) {
      var images = [];
      var flowers = [];
      var moods = [];

      for(i = 0; i < req.files['image'].length; i++) {
        images.push(req.files['image'][i].filename);
      }

      for(i = 0; i < req.body.flowers.length; i++) {
        flowers.push(parseInt(req.body.flowers[i]));
      }

      for(i = 0; i < req.body.moods.length; i++) {
        moods.push(parseInt(req.body.moods[i]));
      }

      bouquet.image = JSON.stringify(images);
      bouquet.setFlowers(flowers);
      bouquet.setMoods(moods);
      bouquet.save()

    }).then(function() {
      res.redirect('/admin/bouquets');
    }).catch(function(err) {
      res.send(err);
    });
  });

router.get('/new', function(req, res, next) {
  models.Flower.findAll().then( function(flowers) {
    models.Mood.findAll().then(function(moods) {
      res.render('bouquets/new', {
          flowers: flowers,
          moods: moods
      });
    }).catch(function(err) {
      res.send(err);
    });
  });
});

router.route('/:id')
  .get(function(req, res, next) {
    var id = req.params.id
    models.Bouquet.findById(id).then(function(bouquet) {
      res.render('bouquets/show', {
        bouquet: bouquet
      });
    });
  })
  .delete(function(req, res) {
    var id = req.params.id;
    models.Bouquet.findById(id).then(function(bouquet) {
      bouquet.destroy();
    }).then(function() {
      res.redirect('/admin/bouquets');
    }).catch(function(err) {
      res.send(err);
    });
  });

router.route('/:id/edit')
  .get(function (req, res, next) {
    models.Bouquet.findById(req.params.id).then(function(bouquet) {
      res.render('bouquets/edit', {
        bouquet: bouquet
      });
    });
  })
  .put(function (req, res, next) {
    var id = req.params.id;
    models.Bouquet.findById(id).then(function(bouquet) {
      bouquet.update(req.body).then(function() {
        res.redirect('/admin/bouquets');
      });
    });
  });

module.exports = router;
