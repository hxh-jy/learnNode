let express = require('express')
let cors = require('cors')

let app = express()
app.use(cors)
app.get('/test',(req,res) => {
    console.log('测试')
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send('跨域请求的配置')
})

let server = app.listen(3000,'localhost',() => {
    let host = server.address().address
    let port = server.address().port

    console.log(`该实例运行的网址为: http://${host}:${port}`)
})