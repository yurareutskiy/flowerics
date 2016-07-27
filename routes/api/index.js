var router = require('express').Router();

router.use('/bouquets', require('./bouquets'));
router.use('/promotions', require('./promotions'));
router.use('/orders', require('./orders'));


module.exports = router;
