var router = require('express').Router(),
    Bouquet = require('../../models/bouquet'),
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
    Bouquet.getBouquets(function(err, bouquets) {
      if (err) {
       res.send(err);
      }
      res.render('bouquets/index', {
        'bouquets' : bouquets
      });
    });
  })
  .post(upload.single('image'), function (req, res, next) {
    var bouquet = new Bouquet({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.files.filename,
      color_image: req.files.filename
      color: req.body.color
    });
    bouquet.save(function(err, bouquet) {
      if (err) {
        res.render('/', { error: res.locals.err });
      }
      res.redirect('/admin/bouquets');
    });
  });

router.get('/new', function(req, res) {
  res.render('bouquets/new');
});

router.route('/:id')
  .get(function (req, res, next) {
    Bouquet.getBouquetById(req.params.id, function(err, bouquet) {
      if (err) {
        res.send(err);
      }
      res.render('bouquets/show', {
        'bouquet' : bouquet
      });
    });
  })
  .delete(function (req, res, next) {
    var id = req.params.id;
    Bouquet.findOne({_id: id}, function(err, bouquet){
      if (err) {
        res.send(err);
      }
      bouquet.remove(function(err){
        res.redirect('/admin/bouquets');
      });
    });
  });

router.route('/:id/edit')
  .get(function (req, res, next) {
    Bouquet.getBouquetById(req.params.id, function(err, bouquet) {
      if (err) {
        res.send(err);
      }
      res.render('bouquets/edit', {
        'bouquet' : bouquet
      });
    });
  })
  .put(function (req, res, next) {
    var id = req.params.id;
    var bouquet = req.body;
    Bouquet.updateBouquet(id, bouquet, {}, function(err, bouquet) {
      if (err) {
        res.send(err);
      }
      res.redirect('/admin/bouquets/' + bouquet._id);
    });
  });

module.exports = router;
