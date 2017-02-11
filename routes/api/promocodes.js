var router = require('express').Router(),
    models = require('models');

router.get('/:code', function(req, res) {
  var code = req.params.code;
  models.Promocode.find(
    {
      where: { code: code }
    }).then(function(promocode) {
    res.json(promocode);
  });
});

module.exports = router;
