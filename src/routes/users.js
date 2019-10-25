const { Router } = require('express');
const UserService = require('../services/UserService')
const mysql = require('mysql');
const connector = require('../models/connector')
const pool = mysql.createPool(connector);
const fs = require('fs');

const multer = require('multer');
const router = Router();

// 파일 저장 위치와 파일 이름 설정
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
            console.log("이미지 파일 체크 완료");
            cb(null, 'images')
        }
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage });

router.get('', UserService.readUsers)
router.get('/logout', UserService.logoutUser)
router.post('', UserService.createNormalUser)
router.post('/club', upload.single('imageupload'), UserService.createClubUser)
router.post('/login', UserService.loginUser)


module.exports = router;