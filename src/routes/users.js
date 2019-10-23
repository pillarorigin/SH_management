const { Router } = require('express');
const UserService = require('../services/UserService')

const router = Router();

router.get('', UserService.readUsers) 
router.post('', UserService.createUser)

module.exports = router;