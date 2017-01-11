var router = require('express').Router(),
    models = require('../../models'),
    multer  = require('multer'),
    mime  = require('mime');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../../public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
  }
});

var upload = multer({ storage: storage });

router.route('/')
  .get(function (req, res, next) {
    models.Promotion.findAll().then(function(promotions) {
      res.render('promotions/index', {
        promotions: promotions
      });
    });
  })
  .post(upload.single('image'), function (req, res, next) {
    models.Promotion.create({
      name: req.body.name,
      description: req.body.description,
      image: req.file.filename
    }).then(function() {
      res.redirect('/admin/promotions');
    });
  });

router.get('/new', function(req, res) {
  res.render('promotions/new');
});

router.route('/:id')
  .get(function(req, res, next) {
    models.Promotion.findById(req.params.id).then(function(promotion) {
      res.render('promotions/show', {
        promotion: promotion
      });
    });
  })
  .delete(function(req, res) {
    var id = req.params.id;
    models.Promotion.findById(id).then(function(promotion) {
      promotion.destroy();
    }).then(function() {
      res.redirect('/admin/promotions');
    }).catch(function(err) {
      res.send(err);
    });
  });

router.route('/:id/edit')
  .get(function(req, res, next) {
    models.Promotion.findById(req.params.id).then(function(promotion) {
      res.render('promotions/edit', {
        promotion: promotion
      });
    });
  })
  .put(function (req, res, next) {
    var id = req.params.id;
    models.Promotion.findById(id).then(function(promotion) {
      promotion.update(req.body).then(function() {
        res.redirect('/admin/promotions');
      });
    });
  });

module.exports = router;
