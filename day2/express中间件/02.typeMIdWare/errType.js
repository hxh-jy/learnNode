// 路由级别的中间件
let express = require('express')
let app = express()
let router = express.Router()
router.get('/',(req,res) => {
    throw new Error('服务器出错')
    res.send(req.midType)
})

/**
 * 专门用来捕获项目中发生的异常错误从而防止项目奔溃
 * 错误级别的中间件必须有死噶参数
 * 必须注册在所有路由的后边
 */
function errMid(err,req,res,next) {
    req.midType = '错误级别的中间件的使用'
    console.log('发生了错误',err.message)
    res.send('Error!' + err.message)
    // next不可以省略掉 表示把流转关系转交给下一个中间件或者路由。
    next()
}
app.use(router)

app.use(errMid)
let server = app.listen(3002,'localhost',() => {
    let host = server.address().address
    let port = server.address().port
    console.log(`该实例运行的地址是: http://${host}:${port}`)
})