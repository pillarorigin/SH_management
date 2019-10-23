const mysql = require('mysql');
const connector = require('../models/connertor')
const pool = mysql.createPool(connector);

const createUser = (req, res) => {
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
            res.json({ result: "false" })
        }
    })

}

const readUsers = (req, res) => {
    let sql = `select * from users`;
    pool.query(sql, function (err, rows) {
        if (!err) {
            res.json({ result: rows })
        } else {
            res.json({ result: "false" })
        }
    })
}


module.exports = {
    createUser,
    readUsers
}