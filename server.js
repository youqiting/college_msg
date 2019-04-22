let express = require('express');
let app = express();
let cors =require('cors');

let router = require('./serve/router.js');
let router_stu = require('./serve/router_stu.js');
let router_teacher = require('./serve/router_teacher.js');

app.use(cors({
    credentials:true,
    origin:'http://localhost:8080'
}))

app.use(express.static(__dirname));
router(app);
router_stu(app);
router_teacher(app);

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

