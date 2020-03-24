const http = require('http')
const express = require('express')
const body = require('body-parser')
const fs = require('fs')

const conf = require('./conf/config.js')
const fu = require('./util/fileUtil.js')
const ip = require('./util/ipUtil.js')

var app = express()
.use(body.json())
.use(body.urlencoded({ extended: true }))

//设置跨域访问  
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
}); 

//访问首页
app.get('/', (req, res) => {
    //console.info(req.query)
    console.info(req.host+"请求URL:"+req.url)
    res.writeHeader(200, {"Content-Type": "text/html"});
    fs.readFile("./front/page/index.html",function (err,data){
        if(err){
            res.writeHeader(404);
            res.write('<h1>404</h1>');
        } else{
            res.write(data);
            res.write(`<script>path = "${conf.address}"</script>`)
        }
        res.end();
    });
});

//前台资源访问
app.get('/front/*', (req, res) => {
    console.info(req.host+"请求URL:"+req.url)
    res.writeHeader(200, {"Content-Type": "application/octet-stream"});
    fs.readFile("."+req.url,function (err,data){
        if(err){
            res.writeHeader(404);
            res.write('<h1>404</h1>');
        } else{
            res.write(data);
        }
        res.end();
    });
});

//文件列表
app.post("/fslist",(req,res)=>{
    console.info(req.host+"请求URL:"+req.url)
    let params = req.body
    res.write(JSON.stringify(fu(params.path)))
    res.end()
})

//下载
app.get("/download",(req,res)=>{
    console.info(req.host+"请求URL:"+req.url)
    let params = req.query
    let f = fs.createReadStream(params.path)
    res.writeHead(200, {
        'Content-Type': 'application/force-download',
        'Content-Disposition': 'attachment; filename='+params.name
    })
    f.pipe(res)
})

http.createServer(app).listen(conf.port)

console.info("服务启动成功,请访问")
ip.forEach(item=>{
    console.info(`http://${item}:${conf.port}`)
})