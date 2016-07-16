var router = require('express').Router(),
    Flower = require('../../models/flower'),
    multer  = require('multer'),
    crypto  = require('crypto'),
    mime  = require('mime');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '../../../public/uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

var upload = multer({ storage: storage });

router.route('/')
  .get(function (req, res, next) {
    Flower.getFlowers(function(err, flowers) {
      if (err) {
       res.send(err);
      }
      res.render('flowers/index', {
        'flowers' : flowers
      });
    });
  })
  .post(upload.single('image'), function (req, res, next) {
    var flower = new Flower({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.file.filename
    });
    flower.save(function(err, flower) {
      if (err) {
        res.send(err);
      }
      res.redirect('/admin/flowers');
    });
  });

router.get('/new', function(req, res) {
  res.render('flowers/new');
});

router.route('/:id')
  .get(function (req, res, next) {
    Flower.getFlowerById(req.params.id, function(err, flower) {
      if (err) {
        res.send(err);
      }
      res.render('flowers/show', {
        'flower' : flower
      });
    });
  })
  .delete(function (req, res, next) {
    var id = req.params.id;
    Flower.removeFlower(id, function(err, flower) {
      if (err) {
        res.send(err);
      }
      res.redirect('/admin/flowers');
    });
  });

router.route('/:id/edit')
  .get(function (req, res, next) {
    Flower.getFlowerById(req.params.id, function(err, flower) {
      if (err) {
        res.send(err);
      }
      res.render('flowers/edit', {
        'flower' : flower
      });
    });
  })
  .put(function (req, res, next) {
    var id = req.params.id;
    var flower = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.file.filename
    };
    flower.updateFlower(id, flower, {}, function(err, flower) {
      if (err) {
        res.send(err);
      }
      res.redirect('/admin/flowers/' + flower._id);
    });
  });

module.exports = router;
