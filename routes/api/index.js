var router = require('express').Router();

router.use('/bouquets', require('./bouquets'));
router.use('/flowers', require('./flowers'));
router.use('/moods', require('./moods'));
router.use('/promotions', require('./promotions'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/replies', require('./replies'));
router.use('/promocodes', require('./promocodes'));
router.use('/cards', require('./cards'));

module.exports = router;
