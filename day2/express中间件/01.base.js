let express = require('express')
let app = express()
function mid (req,res,next) {
    req.dateTime = new Date().getTime()
    next()
}

function globalMid(req,res,next) {
    req.test = '*****测试全局中间件的使用'
    next()
}
// 注册全局中间件,必须在路由的上方
app.use(globalMid)
// 使用全局中间件
app.get('/globalMid',(req,res) => {
    res.send(`全局中间件的使用${req.test}`)
})
// 局部中间件的使用
app.get('/localMid',mid,(req,res) => {
    console.log('测试获取中间件中定义的相关属性',req.dateTime)
    res.send(`局部中间件的基础使用${req.dateTime}`)
})

let server = app.listen(3001,'localhost',() => {
    let host = server.address().address
    let port = server.address().port
    console.log(`该实例的运行地址为: http://${host}:${port}`)
})