const { Router } = require('express');
const testService = require('../services/testService')
const router = Router();

router.get('', testService.dbTest)

router.get('/test', async(req, res) =>{
    const result = await testService.dbTests;
    res.json(result)
})

module.exports = router;