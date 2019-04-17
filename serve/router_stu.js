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
            form = stu_From(grade);
            sql = "select * from "+form+" where student_id='"+request.name+"'";
        }
        console.log("sql:"+sql);
        if(sql !=''){
            checkPWD(sql, request.usertype, pwd, res); 
        }else{
            var result = {
                code:1,
                usertype:"",
                state: "null"
            }
            res.send(result);
            res.end();
        }
        
    })

    // <实习>  查询实习信息
    app.post('/selectStuPrac',urlencodeParser, function(req, res){
        var request = req.body;
        console.log(request);
        var form = stu_practiceFrom(request.grade);
        var sql = "select * from "+ form + " where student_name='"+request.name+"'";
        console.log("sql:"+sql);
        runSQL(sql, res);
    })
    
    // <实习>  填写/更新实习信息
    app.post('/updatePractice',urlencodeParser, function(req, res){
        var request = req.body;
        var form = stu_practiceFrom(request.grade);
        var sql = "update "+ form + " set teacher_name='"+request.teacher_name
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

    // 获取班级名单
    app.post('/selectAllStu',urlencodeParser, function(req, res){
        var request = req.body;;
        var sql ="select * from student"+ request.grade;
        runSQL(sql, res);
    })

}

//  返回-> 学生对应年级的信息表
function stu_From(grade){
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

//  返回-> 学生对应年级的实习表
function stu_practiceFrom(grade){
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
        console.log(data);
        res.send(data);
        res.end();
    })
}

//  sql验证密码
function checkPWD(sql, usertype, pwd, res){
    query(sql, function(err, result){
        if(err) {
            console.log(err);
        }
        var state = '';
        console.log("result:"+result);
        if(result !='' || result !=undefined){
            if(result[0].teacher_pwd == pwd && usertype == "teacher"){
                state = 'success';
                usertype = 'teacher';
            }else if(result[0].student_pwd == pwd && usertype == "student"){
                state = 'success';
                usertype = 'student';
            }else if(result == ''){
                state = 'fail';
            }
            var result = {
                code:1,
                data: result,
                usertype: usertype,
                state: state
            }
            res.send(result);
            res.end(); 
        }else if(result =='' || result ==undefined){
            var result = {
                code:1,
                usertype:"",
                state: "null"
            }
            res.send(result);
            res.end();
        }
    })
}
module.exports = router;      //导出模块内的对象







