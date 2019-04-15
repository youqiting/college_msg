var query = require('./mysql.js');
var bodyparser = require('body-parser');     //node.js中间件，用于处理JSON,Eaw,Text和URL编码的数据
var urlencodeParser = bodyparser({extended:false});

function router(app){
    //登录
    app.post('/login',urlencodeParser, function(req, res){
        var request = req.body;
        var sql = "",form='';
        var pwd = request.password;
        var grade = '';
        if(request.type == 'tch'){
            sql = "select * from teacher where teacher_name='"+request.name+"'";
            form = 'teacher';
        }else {
            grade = request.name.substring(0,4);
            form = stu_FromName(grade);
            sql = "select * from "+form+" where student_id='"+request.name+"'";
        }
        console.log("sql:"+sql);
        if(sql !=''){
            runSQL(sql, request.type, pwd, res); 
        }else{
            var result = {
                code:1,
                type:"",
                state: "null"
            }
            res.send(result);
            res.end();
        }
        
    })

    //获取2015毕业设计题目表
    app.post('/selectDesign',urlencodeParser, function(req,res){
        console.log("selectDesign");
        var request = req.body;
        var sql='';
        sql = "select * from "+ request.form;
        query(sql, function(err, result){
            if(err){
                console.log(err);
            }
            var data = {
                code: 1,
                result: result,
                msg: ''
            }
            res.send(data);
            res.end();
        })
    })

    //获取 <指定教师> 2015毕业设计题目表
    app.post('/selectDesignByTch',urlencodeParser, function(req,res){
        console.log("selectDesignByTch");
        var request = req.body;
        var sql='';
        sql = "select * from "+ request.form +" where teacher_name ='"+ request.name+"'";
        query(sql, function(err, result){
            if(err){
                console.log(err);
            }
            var data = {
                code: 1,
                result: result,
                msg: ''
            }
            console.log(result);
            res.send(data);
            res.end();
        })
    })

}

//  返回选择学生对应的
function stu_FromName(grade){
    var form = '';
    if(grade == '2014'){
        form = 'student2014';
    }else if(grade == '2015'){
        form = 'student2015';
    }else if(grade == '2016'){
        form = 'student1672';
    }
    return form;
}
//  sql验证密码
function runSQL(sql, type, pwd, res){
    query(sql, function(err, result){
        if(err) {
            console.log(err);
        }
        var state = '';
        console.log("result:"+result);
        if(result !='' || result !=undefined){
            if(result[0].teacher_pwd == pwd && type == "tch"){
                state = 'success';
                type = 'teacher';
            }else if(result[0].student_pwd == pwd && type == "stu"){
                state = 'success';
                type = 'student';
            }else if(result == ''){
                state = 'fail';
            }
            var result = {
                code:1,
                data: result,
                type: type,
                state: state
            }
            res.send(result);
            res.end(); 
        }else if(result =='' ||result ==undefined){
            var result = {
                code:1,
                type:"",
                state: "null"
            }
            res.send(result);
            res.end();
        }
    })
}

module.exports = router;      //导出模块内的对象







