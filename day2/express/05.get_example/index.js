let express = require('express')

let app = express()

app.get('/process_get',(req,res) => {
    console.log('测试请求相关的数据',req.query,req.params)
   // 输出 JSON 格式
   var response = {
        "first_name":req.query.first_name,
        "last_name":req.query.last_name
    };
    // console.log(response);

    // 设置响应头  避免中文乱码
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(response);
})

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
 })

let server = app.listen(3000,'localhost',() => {
    let host = server.address().address
    let port = server.address().port

    console.log(`当前实例运行的地址为: http://${host}:${port}`)
})