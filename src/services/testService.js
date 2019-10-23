const mysql = require('mysql2/promise');
const connector = require('../models/connertor');
const pool = mysql.createPool(connector);

const dbTest = async (req, res) =>{
    try{
        const connection = await pool.getConnection(async conn=>conn);
        try{
            let sql = `select * from tests`;
            await connection.beginTransaction();
            let result = await connection.query(sql, function(err, rows){
                if(err){
                    console.log('error case0',err);
                    connection.release();
                    return false;
                }else{
                    connection.release();
                    res.json(rows)
                }
            })
            
        }catch(err){
            await connection.rollback();
            connection.release();
            console.log('error case1',err);
            return false;
        }
    }catch(err){
        console.log('error case2',err);
        return false;
    }
}

const dbTests = () =>{
    return new Promise(resolve =>{
        setTimeout(_ => {
            resolve({ message : 'success' })
        }, 2000);
    })
}

module.exports = {
    dbTest,
    dbTests
}