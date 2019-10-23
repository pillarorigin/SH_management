const { Router } = require('express');
const router = Router();
const users = require('./users');

router.use('/users', users)

router.get('/', (req, res) => {
    res.render("test.html")
})

module.exports = router;