let express = require('express')

let app = express()

app.get('/',(req,res) => {
    res.send('get请求  主页')
})

// 设置中间件  http://127.0.0.1:8080/public/img/test.jpg
app.use('/public',express.static('public'))

let server = app.listen(8080,'localhost',() => {
    let host = server.address().address
    let port = server.address().port

    console.log(`当前实例运行的地址为:http://${host}:${port}`)
})