const mysql = require('mysql');
const connector = require('../models/connector')
const pool = mysql.createPool(connector);
const fs = require('fs');

const multer = require('multer');

const createNormalUser = (req, res) => {
    let userId = req.body.userId;
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

const loginUser = (req, res) =>{
    let userId = req.body.userid;
    let password = req.body.password;
    let sql = `select pa(ssword from users where userId=?`
    pool.query(sql, [userId], function(err, rows){
        if(!err){

            if(rows.length === 0){
                res.json({ result: "NoId" })
            }else if(rows[0].password != password){
                res.json({ result: "NoPw" })
            }else{
                req.session.id = userId;
                console.log(req.session);
                console.log(req.session.id);
                res.json({ 
                    result: "successs",
                    session: userId
             })
            }
        }else{
            res.json({ result: "fail" })
        }
    })
}

const logoutUser = (req, res)=>{
    console.log(req.session);
    req.session.destroy(function(err){
        if(err){
            res.json({ result : "faile" })
        }else{
            res.json({ result: "logout" })
        }
    })

}


module.exports = {
    createNormalUser,
    createClubUser,
    readUsers,
    loginUser,
    logoutUser
}