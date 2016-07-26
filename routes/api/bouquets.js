var router = require('express').Router(),
    Bouquet = require('../../models/bouquet');

router.route("/")
  .get(function (req, res, next) {
    Bouquet.getBouquets(function(err, bouquets) {
      if (err) {
       res.send(err);
      }
      res.json(bouquets);
    });
  });

router.route('/:id')
  .get(function (req, res, next) {
    Bouquet.getBouquetById(req.params.id, function(err, bouquet) {
      if (err) {
        res.send(err);
      }
      res.json(bouquet);
    });
  });

module.exports = router;
