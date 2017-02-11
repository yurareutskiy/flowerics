var router = require('express').Router(),
    models = require('models');
router.route('/')
  .get(function(req, res, next) {
    models.Card.findAll({
      where: { userId: req.user.id },
    }).then(function(cards) {
      res.json(cards);
    }).catch(function(err) {
      res.send(err);
    });
  })
  .post('/', function (req, res, next) {
    var card = req.body;
    models.Card.create(card).then(function(card) {
      res.status(201).json(card.id);
    }).catch(function(err) {
      res.status(422).send(err);
    })
  });

module.exports = router;
