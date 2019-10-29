const { Router } = require('express');
const router = Router();
const users = require('./users');
const promotion = require('./promotion');

router.use('/users', users)
router.use('/promotion', promotion)

router.get('/', (req, res) => {
    res.render("test.html");
})

module.exports = router;