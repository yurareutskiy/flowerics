var router = require('express').Router(),
    Promotion = require('../../models/promotion'),
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
    Promotion.getPromotions(function(err, promotions) {
      if (err) {
       res.send(err);
      }
      res.render('promotions/index', {
        'promotions' : promotions
      });
    });
  })
  .post(upload.single('image'), function (req, res, next) {
    var promotion = new Promotion({
      name: req.body.name,
      description: req.body.description,
      image: req.file.filename,
    });
    promotion.save(function(err, promotion) {
      if (err) {
        res.send(err);
      }

    res.redirect('/admin/promotions');
    });
  });

router.get('/new', function(req, res) {
  res.render('promotions/new');
});

router.route('/:id')
  .get(function (req, res, next) {
    Promotion.getPromotionById(req.params.id, function(err, promotion) {
      if (err) {
        res.send(err);
      }
      res.render('promotions/show', {
        'promotion' : promotion
      });
    });
  })
  .delete(function (req, res, next) {
    var id = req.params.id;
    Promotion.findOne({_id: id}, function(err, promotion){
      if (err) {
        res.send(err);
      }
      promotion.remove(function(err){
        res.redirect('/admin/promotions');
      });
    });
  });

router.route('/:id/edit')
  .get(function (req, res, next) {
    Promotion.getPromotionById(req.params.id, function(err, promotion) {
      if (err) {
        res.send(err);
      }
      res.render('promotions/edit', {
        'promotion' : promotion
      });
    });
  })
  .put(function (req, res, next) {
    var id = req.params.id;
    var promotion = req.body;
    Promotion.updatePromotion(id, promotion, {}, function(err, promotion) {
      if (err) {
        res.send(err);
      }
      res.redirect('/admin/promotions/' + promotion._id);
    });
  });

module.exports = router;
