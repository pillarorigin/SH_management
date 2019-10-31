const mysql = require('mysql');
const connector = require('../models/connector')
const pool = mysql.createPool(connector);
/* 
board_idx(pk), title, writer, imgPath, group_name, content, accounts_number, date
*/ 
//홍보게시판 전체글 조회
const readPromotion = (req, res) => {
    let board_idx = req.params.board_idx;
    console.log(board_idx);
    let sql = `select * from board where board_idx = ?`;
    pool.query(sql, [board_idx], function (err, rows) {
        if (!err) {
            res.json({ "result": rows })
        } else {
            res.json({ result: "fail" });
        }
    })
}

//홍보게시판 게시글 쓰기
const insertPromotion = (req, res) => {
    let board_idx = req.body.board_idx;
    let title = req.body.title;
    let writer = req.body.writer;   
    let imgPath = req.file.path;
    let group_name = req.body.group_name;
    let content = req.body.content;
    let accounts_number = req.body.accounts_number; 
    let date = new Date();

    let sql = `insert into board values(?, ?, ?, ?, ?, ?, ?, ?)`;
    pool.query(sql, [board_idx, title, writer, imgPath, group_name, content, accounts_number, date], function (err, rows) {
        if (!err) {
            //res.json({result:"success"});
            res.json({
                "result": rows
            })
        } else {
            console.log(err)
            res.json({ result: "fail" });
        }
    })
}

//홍보 게시판 수정
const updatePromotion = (req, res) => {
    //board_idx, title, writer, imgPath, group_name, content, accounts_number, date
    let title = req.body.title;
    let imgPath = req.file.path;
    let group_name = req.body.group_name;
    let content = req.body.content;
    let accounts_number = req.body.accounts_number;
    let date = new Date();

    sql = `update board set title=?, imgPath=?, slogan=?, detail=?`;
    pool.query(sql, [title, imgPath, group_name, content, accounts_number, date], function (err, rows) {
        if (!err) {
            res.json({ "result": rows })
            //res.send("패스워드가 일치하지 않습니다"); 
        } else {
            res.json({ result: "fail" })
            //res.redirect('/board/read'+idx); //수정 후 성공하면 다시 원래 상세페이지로 이동하게
        }
    })
}

//홍보 게시판 페이징
const pagingPromotion = (req, res) => {
    let sql = `select count (*) as TotalCount from ??`; //전체 게시물 개수 가져오기
    // console.log("ㅎㅇ")
    let boardtable = ["board"];
    let query = mysql.format(sql, boardtable);
    // console.log("ㅎㅇ2")
    // console.log(query);
    let TotalCount, StartNum, LimitNum;
    pool.query(query, function (err, rows) {
        if (err) {
            // console.log("첫번째 쿼리 에러");
            return err;
        } else {
            //전체 게시물 담아
            TotalCount = rows[0].TotalCount
            if (req.body.start == '' || req.body.limit == '') {
                // console.log("값이 없음. 초기화")
                StartNum = 0;
                LimitNum = 10;
                // console.log(StartNum,LimitNum)
            } else {
                // console.log(`값이 있음. start: ${StartNum}, limit: ${LimitNum}`)
                StartNum = parseInt(req.body.start);
                LimitNum = parseInt(req.body.limit);
            }
            //console.log(`limit: ${LimitNum}, start: ${StartNum}`)
            query = `select * from ?? order by board_idx desc LIMIT ? OFFSET ?`;
            // 사용자의 records 정보를 가져와서 limit과 start 보내줌
            let table = ["board", LimitNum, StartNum];
            query = mysql.format(query, table);
            // console.log(query)
            pool.query(query, function (err, rest) {
                if (err) {
                    // console.log("두번째 쿼리 에러");
                    res.json(err);
                } else {
                    res.json({ "Total Count": TotalCount, "data": rest });
                }
            });
        }
    })
    
}

module.exports = {
    insertPromotion,
    readPromotion,
    updatePromotion,
    pagingPromotion
}