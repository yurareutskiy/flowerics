var router = require('express').Router(),
    models = require('models');

router.post('/', function (req, res, next) {
    var reply = req.body;
    models.reply.create(reply).then(function(reply) {
      res.status(201).json(reply);
    }).catch(function(err) {
      res.status(422).send(err);
    })
  });

module.exports = router;
