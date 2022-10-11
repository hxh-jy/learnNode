// 路由级别的中间件
let express = require('express')
let app = express()
let router = express.Router()

function mid(req,res,next) {
    req.midType = '路由级别的中间件的使用'
    // next不可以省略掉 表示把流转关系转交给下一个中间件或者路由。
    next()
}

router.get('/',mid,(req,res) => {
    res.send(req.midType)
})
app.use(router)

let server = app.listen(3002,'localhost',() => {
    let host = server.address().address
    let port = server.address().port
    console.log(`该实例运行的地址是: http://${host}:${port}`)
})