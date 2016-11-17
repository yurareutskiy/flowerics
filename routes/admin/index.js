var router = require('express').Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require('../../config/passport');

router.use(bodyParser.urlencoded({ extended: true, keepExtensions: true }));
router.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

router.use('/bouquets', passport.isLoggedIn, require('./bouquets'));
router.use('/users', passport.isLoggedIn, require('./users'));
router.use('/orders', passport.isLoggedIn, require('./orders'));
router.use('/dashboard', passport.isLoggedIn, require('./dashboard'));
router.use('/promotions', passport.isLoggedIn, require('./promotions'));
router.use('/flowers', passport.isLoggedIn, require('./flowers'));
router.use('/moods', passport.isLoggedIn, require('./moods'));
router.use('/orders', passport.isLoggedIn, require('./orders'));
router.use('/login', require('./login'));
router.use('/logout', require('./logout'));

module.exports = router;
