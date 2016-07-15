var router = require('express').Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

router.use('/flowers', require('./flowers'));

module.exports = router;
