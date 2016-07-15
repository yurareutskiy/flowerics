var router = require('express').Router();

router.use('/flowers', require('./flowers'));
router.use('/users', require('./users'));

module.exports = router;
