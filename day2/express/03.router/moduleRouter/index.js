let router = require('./router.js')

let express = require('express')

let app = express()

// 使用app.use注册路由
app.use(router)

let server = app.listen(3000,'localhost',() => {
    let host = server.address().address
    let port = server.address().port

    console.log(`该实例运行的地址为:\n http://${host}:${port}`)
})