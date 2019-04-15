let mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'root',
    database:'college_msg'
})

let query = function(sql, callback){
    pool.getConnection(function(err, connect){
        if(err){
            callback(err, null);
        }else{
            connect.query(sql, function(res, result){
                connect.release();
                callback(err,result);
            })
        }
    })
}


module.exports = query;
