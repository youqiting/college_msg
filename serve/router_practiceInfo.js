var query = require('./mysql.js');
var bodyparser = require('body-parser');     //node.js中间件，用于处理JSON,Eaw,Text和URL编码的数据
var urlencodeParser = bodyparser({extended:false});

function router(app){
    // 查询实习信息
    app.post('/selectPractice',urlencodeParser, function(req, res){
        var request = req.body;
        console.log(request);
        var sql = "";
        var form = stu_FromName(request.grade);
        sql = "select * from "+ form + " where student_name='"+request.name+"'";
        console.log("sql:"+sql);
        runSQL(sql, res);
    })
    
    // 填写/更新实习信息
    app.post('/updatePractice',urlencodeParser, function(req, res){
        var request = req.body;
        var sql = "";
        var form = stu_FromName(request.grade);
        sql = "update "+ form + " set teacher_name='"+request.teacher_name
                              +"',teacher_tel='" +request.teacher_tel
                              +"',practice_time='" +request.practice_time
                              +"',practice_type='"+request.practice_type
                              +"',practice_long='"+request.practice_long
                              +"',practice_company='"+request.practice_company
                              +"',relation_name='"+request.relation_name
                              +"',relation_tel='"+request.relation_tel
                              +"',arrange='"+request.arrange
                              +"',post='"+request.post
                              +"',company_taken='"+request.company_taken
                              +"',tenBreak='"+request.tenBreak
                              +"',sixteenBreak='"+request.sixteenBreak
                              +"',changed='"+request.changed
                              +"',remark='"+request.remark + "' where student_name ='"+request.name+"'";
        runSQL(sql, res);
    })
}

//  返回选择学生对应的
function stu_FromName(grade){
    var form = '';
    if(grade == '2014'){
        form = 'practiceinfo2014';
    }else if(grade == '2015'){
        form = 'practiceinfo2015';
    }else if(grade == '2016'){
        form = 'practiceinfo1672';
    }
    return form;
}

//  sql语句
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
        console.log(data);
        res.send(data);
        res.end();
    })
}
module.exports = router;      //导出模块内的对象







