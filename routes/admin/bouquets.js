var router = require('express').Router(),
    Bouquet = require('../../models/bouquet'),
    Flower = require('../../models/flower'),
    Mood = require('../../models/mood'),
    async = require('async'),
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

var upload = multer({ storage: storage }).fields(
              [
                { name: 'image', maxCount: 3 },
                { name: 'icon', maxCount: 1 }
              ]
            );

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
  .post(upload, function (req, res, next) {
    var bouquet = new Bouquet({
      name: req.body.name,
      description: req.body.description,
      prescription: req.body.prescription,
      price: req.body.price,
      icon: req.files['icon'][0].filename,
      color: req.body.color
    });
    for(i = 0; i < req.files['image'].length; i++) {
      bouquet.images.push( req.files['image'][i].filename );
    }
    for(i = 0; i < req.body.flowers.length; i++) {
      bouquet.flowers.push({ name : req.body.flowers[i] });
    }
    for(i = 0; i < req.body.moods.length; i++) {
      bouquet.moods.push({ name : req.body.moods[i] });
    }
    bouquet.save(function(err, bouquet) {
      if (err) {
        res.send(err);
      }

      res.redirect('/admin/bouquets');
    });
  });

router.get('/new', function(req, res) {
    var FlowerObj = Flower.find({});
    var MoodObj = Mood.find({});
    var resources = {
      flowers: FlowerObj.exec.bind(FlowerObj),
      moods: MoodObj.exec.bind(MoodObj)
    };

    async.parallel(resources, function (error, results){
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.render('bouquets/new', {
        'results' : results
      });
    });
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
    bouquet.image = req.files['image'][0].filename;
    bouquet.icon = req.files['icon'][0].filename;
    Bouquet.updateBouquet(id, bouquet, {}, function(err, bouquet) {
      if (err) {
        res.send(err);
      }
      res.redirect('/admin/bouquets/');
    });
  });

module.exports = router;
