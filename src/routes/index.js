const { Router } = require('express');
const router = Router();
const users = require('./users');
const tests = require('./tests');

router.use('/users', users)
router.use('/tests', tests)


module.exports = router;