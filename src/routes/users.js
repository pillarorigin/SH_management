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
    destination: function(req, images, cb){
        if(images.mimetype == "image/jpeg" || images.mimetype == "image/jpg" || images.mimetype == "image/png"){
            console.log("이미지 파일 체크 완료");
            cb(null, 'public/images')
        }else{
            console.log("error 밯생?")
        }
    },
    filename: function(req, images, cb){
        cb(null, Date.now() + "-" + images.originalname)
    }
})

const upload = multer({ storage: storage });

router.get('', UserService.readUsers)
router.get('/logout', UserService.logoutUser)
router.get('/:userId', UserService.readUser)
router.post('', UserService.createNormalUser)
router.post('/club', upload.single('imageupload'), UserService.createClubUser)
router.post('/register', upload.single('images') ,UserService.createGroupUser);
router.post('/login', UserService.loginUser)


module.exports = router, upload;

