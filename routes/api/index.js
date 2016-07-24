var router = require('express').Router();

router.use('/flowers', require('./flowers'));
router.use('/orders', require('./orders'));


module.exports = router;
