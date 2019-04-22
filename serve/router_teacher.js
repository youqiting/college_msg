var query = require('./mysql.js');
var bodyparser = require('body-parser');     //node.js中间件，用于处理JSON,Eaw,Text和URL编码的数据
var urlencodeParser = bodyparser({extended:false});

function router(app){
    //教师数据库操作、毕设表操作

    //查看教师信息
    app.post('/selectTchInfo', urlencodeParser, function(req, res){
        console.log("selectTchInfo");
        var request = req.body;
        var sql = "select * from teacher where teacher_name ='"+ request.teacher_name+"'";
        runSQL(sql, res);
    })

    //修改教师信息 
    app.post('/updateTchInfo',urlencodeParser, function(req, res){
        var request = req.body;
        var sql = "update teacher set teacher_name ='"+request.teacher_name
                                                      +"',teacher_id ='" +request.teacher_id
                                                      +"',teacher_pwd ='" +request.teacher_pwd
                                                      +"',teacher_tel ='" +request.teacher_tel
                                                      + "' where teacher_name ='"+request.teacher_name+"'";
        runSQL(sql, res);
    })

    //<毕设表>   获取2015毕业设计题目表
    app.post('/selectDesign',urlencodeParser, function(req,res){
        console.log("selectDesign");
        var request = req.body;
        var form = stu_designFrom(request.grade)
        var sql="select * from "+ form;
        runSQL(sql, res);
    })

    //<毕设表> 获取指定(chooseMsg里)姓名 学生的课题名称
    app.post('/selectDesignByStu',urlencodeParser, function(req,res){
        console.log("selectDesignByStu");
        var request = req.body;
        var form = stu_designFrom(request.grade);
        var sql="select * from "+ form +" where chooseMsg like '%"+ request.name +"%'";
        runSQL(sql, res);
    })

    //<毕设表> 获取指定 id 的毕设
    app.post('/selectDesignById',urlencodeParser, function(req,res){
        console.log("selectDesignById");
        var request = req.body;
        var form = stu_designFrom(request.grade)
        var sql="select * from "+ form +" where id="+ request.id;
        runSQL(sql, res);
    })

    //<毕设表>  获得指定 教师 毕设题目表
    app.post('/selectDesignByTch',urlencodeParser, function(req,res){
        console.log("selectDesignByTch");
        var request = req.body;
        var form = stu_designFrom(request.grade)
        var sql = "select * from "+ form +" where teacher_name ='"+ request.name+"'";
        runSQL(sql, res);
    })

    // <毕设表> 更新选该题的学生信息        
    app.post('/updateChoose',urlencodeParser, function(req,res){
        console.log("updateChoose");
        var request = req.body;
        var form = stu_designFrom(request.grade)
        var sql = "update "+ form +" set chooseMsg ='"+ request.chooseMsg+"' where id="+request.id;
        runSQL(sql, res);
    })
}

//  返回-> 学生对应年级的 design 表（暂时数据库只有design2015表）
function stu_designFrom(grade){
    var form = '';
    if(grade == '2014'){
        form = 'design2014';
    }else if(grade == '2015'){
        form = 'design2015';
    }else if(grade == '2016'){
        form = 'design1672';
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
        // console.log(data);
        res.send(data);
        res.end();
    })
}
module.exports = router;      //导出模块内的对象







