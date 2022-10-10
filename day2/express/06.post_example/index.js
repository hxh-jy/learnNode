let express = require('express')
let bodyParser = require('body-parser')

let app = express()
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.post('/process_post', urlencodedParser,(req,res) => {
    console.log('测试请求相关的数据',req.body)
   // 输出 JSON 格式
   var response = {
        "first_name":req.body.first_name,
        "last_name":req.body.last_name
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