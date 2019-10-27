const mysql = require('mysql');
const connector = require('../models/connertor')
const pool = mysql.createPool(connector);
const fs = require('fs');

const multer = require('multer');

const createNormalUser = (req, res) => {
    let userId = req.body.userid;
    let name = req.body.name;
    let password = req.body.password;
    let role = "normal";
    let date = new Date();
    let sql = `insert into users (userId, name, password, role, date) values(?, ?, ?, ?, ?);`
    pool.query(sql, [userId, name, password, role, date], function (err, rows) {
        if (!err) {

            res.json({ result: "success" })
        } else {
            console.log("error case1", err);
            res.json({ result: "fail" })
        }
    })

}


const createClubUser = (req, res) =>{
    console.log(req.file)
    console.log(req.file.path)
    let sql = `insert into tests (testdata) values(?)`;
    pool.query(sql, [req.file.path], function(err, rows){
        if(!err){
            console.log("성공!!!")
            res.json({ result: "wow" })
        }else{
            res.json({ result: "fail"})
        }
        
    })
}

const readUsers = (req, res) => {
    let sql = `select * from users`;
    pool.query(sql, function (err, rows) {
        if (!err) {
            res.json({ result: rows })
        } else {
            res.json({ result: "fail" })
        }
    })
}

const createGroupUser = (req, res) => {
    let groupId = req.body.groupId;
    let pw = req.body.pw;
    let groupName = req.body.groupName;
    let slogan = req.body.slogan;
    let detail = req.body.detail;
    let accountNumber = req.body.accountNumber;
    let imgPath = req.file.path;
    let role = "group";
    let date = new Date();

    let sql = `insert into groupUsers (groupId, pw, groupName, slogan, detail, imgPath, accountNumber, role, date ) values(?, ?, ?, ?, ?, ?, ?, ?, ?);`
    pool.query(sql, [groupId, pw, groupName, slogan, detail, imgPath, accountNumber, role, date ], function (err, rows) {
        if (!err) {
            res.json({ result: "success" })
        } else {
            console.log("error case1", err);
            res.json({ result: "fail" })
        }
    })
}

module.exports = {
    createNormalUser,
    createClubUser,
    readUsers,
    createGroupUser
}