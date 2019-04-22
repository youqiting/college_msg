var query = require('./mysql.js');
var bodyparser = require('body-parser');     //node.js中间件，用于处理JSON,Eaw,Text和URL编码的数据
var urlencodeParser = bodyparser({extended:false});
var dataTime = require('silly-datetime');

function router(app){
    //获取 话题
    app.post('/selectTalk', urlencodeParser, function(req, res){
        var request = req.body;
        var sql = "select * from talk";
        runSQL(sql, res);
    })

    //发布话题
    app.post('/insertTalk', urlencodeParser, function(req, res){
        var request = req.body;
        var sql = "insert talk set talk_title ='"+ request.title 
                    +"', talk_content ='"+ request.content 
                    +"', talk_writer ='" + request.writer
                     +"', talk_time ='"+ dataTime.format(new Date(),'YYYY-MM-DD HH:mm:ss')+"'";
        runSQL(sql, res);
    })

    //获取 招聘信息
    app.post('/selectRecruit', urlencodeParser, function(req, res){
        var request = req.body;
        var sql = "select * from recruit";
        runSQL(sql, res);
    })

    //获取 招聘信息
    app.post('/selectRecruitById', urlencodeParser, function(req, res){
        var request = req.body;
        var sql = "select * from recruit where id ="+ request.id;
        runSQL(sql, res);
    })

    //发布招聘信息
    app.post('/pulicRecruit', urlencodeParser, function(req, res){
        var request = req.body;
        var sql = "insert recruit set company ='"+ request.company
                                    + "', address ='"+ request.address  
                                    + "', post ='"+ request.post  
                                    + "', postDesc ='"+ request.postDesc 
                                    + "', required ='"+ request.required 
                                    + "', salary ='"+ request.salary
                                    + "', relation ='"+ request.relation +"'";
        runSQL(sql, res);
    })
}

//  运行sql语句
function runSQL(sql, res){
    query(sql, function(err, result){
        if(err) {
            console.log(err);
        }
        console.log("sql:"+sql);
        var data = {
            code:1,
            result:result,
            msg:""
        }
        // console.log(data);
        res.send(data);
        res.end();
    })
}

module.exports = router;
