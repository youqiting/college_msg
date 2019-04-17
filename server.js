let express = require('express');
let app = express();
let cors =require('cors');

let router_teacher = require('./serve/router_teacher.js');
let router_stu = require('./serve/router_stu.js');

app.use(cors({
    credentials:true,
    origin:'http://localhost:8080'
}))

app.use(express.static(__dirname));
router_teacher(app);
router_stu(app);

var developState = "/public";

// 所有的请求都回到index页面
app.get('/',function(req, res){
    res.sendFile(__dirname + developState + '/index.html');
})

var server = app.listen(8081, '0.0.0.0', function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("http://%s:%s",host,port);
})

