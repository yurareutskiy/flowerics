var router = require('express').Router();

router.use('/flowers', require('./flowers'));

module.exports = router;
