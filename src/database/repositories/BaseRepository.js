const mysql = require('mysql');
const connector = require('../connertor')
const connection = mysql.createConnection(connector);

class BaseRepository {
    constructor(tableName){
        this.tableName = tableName;
    }

    find(){
        
        let sql = `select * from ${this.tableName}`
        let result = connection.query(sql, function(err, rows){
            if(err){
                console.log("에러발생1");
                throw err;
            }else{
                var test = JSON.stringify(rows);
                console.log(test)
                return test;    
            }
        })

        
        return result;
        
    }

}
module.exports = BaseRepository;