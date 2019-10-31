const { Router } = require('express');
const PromotionService = require('../services/PromotionService');
const router = Router();
const multer = require('multer');

// 파일 저장 위치와 파일 이름 설정
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
            console.log("이미지 파일 체크 완료");
            cb(null, 'public/images')
        }
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage: storage});

//홍보 게시판 write 구현 완료
router.post('/write', upload.single('imgPath'), PromotionService.insertPromotion); 

//홍보 게시판 read 구현 완료
router.get('/read/:idx', PromotionService.readPromotion)     
router.get('/read', function (req, res){
    res.redirect('/board/read/1')
    //board로 접속 요청이 오면 1페이지로 자동으로 이동하도록 리다이렉트 설정
});

//홍보 게시판 update 구현 중
router.post('/update', upload.single('imgPath'), PromotionService.updatePromotion);

//홍보 게시판 페이징 구현 중
router.get('/page/:page', function(req, res){

})

router.get('/create_board', function (req, res) {
    //session (권한이 있는 사용자인지 확인)
    if (!session.isOwner(req, res)){
        res.redirect('/');
        return false;
    }   //로그인 되어 있는 경우만 허용, title, img, slogan, detail, accoutNumber
    
})

module.exports = router;