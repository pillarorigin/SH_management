const mysql = require('mysql');
const connector = require('../models/connector')
const pool = mysql.createPool(connector);


//홍보게시판 전체글 조회
const readPromotion = (req, res) => {
    let idx = req.params.idx;
    console.log(idx)
    let sql = `select * from board where idx = ?`;
    pool.query(sql, [idx], function(err, rows){
        if(!err) {
            res.json({"result":rows})
        }else{
            console.log(err)
            res.json({result:"fail"});
        }
    })
}

//홍보게시판 게시글 쓰기
const insertPromotion = (req, res) => {
    let idx = req.body.idx; //자동 부여되게 수정하려면 mysql 컬럼에서 설정 해야되나? //필요 x 
    let title = req.body.title;
    let writer = req.body.writer;   //필요 x 
    let imgPath = req.file.path;
    let filePath = imgPath.substring(7);
    filePath = "http://localhost:4000/" + filePath
    let slogan = req.body.slogan;
    let detail = req.body.detail;
    let accountNumber = req.body.accountNumber; //필요 x 

    let sql = `insert into board values(?, ?, ?, ?, ?, ?, ?)`;
    pool.query(sql, [idx, title, writer, filePath, slogan, detail, accountNumber] , function (err, rows){
        if(!err){
            //res.json({result:"success"});
            res.json({
                "result": rows
            })
        }else{
            console.log(err)
            res.json({result:"fail"});
        }
    })
}


//홍보 게시판 수정
const updatePromotion = (req, res) => {
    let title = req.body.title;
    let imgPath = req.file.path;
    let slogan = req.body.slogan;
    let detail = req.body.detail;
    
    sql = `update board set title=?, imgPath=?, slogan=?, detail=?`;
    pool.query(sql, [title, imgPath, slogan, detail], function (err, rows){
        if(!err){
            res.json({"result":rows})
            //res.send("패스워드가 일치하지 않습니다"); 
        }else{
            res.json({result:"fail"})
            //res.redirect('/board/read'+idx); //수정 후 성공하면 다시 원래 상세페이지로 이동하게
        }
    })
}

module.exports = {
    insertPromotion,
    readPromotion,
    updatePromotion
}