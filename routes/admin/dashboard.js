var router = require('express').Router(),
    Bouquet = require('../../models/bouquet');

router.route('/')
  .get(function (req, res) {
    Bouquet.getBouquets(function(err, bouquets) {
      if (err) {
       res.send(err);
      }
      res.render('index', {
        'bouquets' : bouquets
      });
    });
  });

module.exports = router;
