var router = require('express').Router(),
    Promotion = require('../../models/promotion');

router.route("/")
  .get(function (req, res, next) {
    Promotion.getPromotions(function(err, promotions) {
      if (err) {
       res.send(err);
      }
      res.json(promotions);
    });
  });

router.route('/:id')
  .get(function (req, res, next) {
    Promotion.getPromotionById(req.params.id, function(err, promotion) {
      if (err) {
        res.send(err);
      }
      res.json(promotion);
    });
  });

module.exports = router;
