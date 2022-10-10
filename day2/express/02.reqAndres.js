const express = require('express')

let app = express()

/**
 * request对象标识HTTP请求
 * 包含了请求查询字符串、参数、内容、HTTP头部等属性
 * req.hostname 获取主机名和IP地址----127.0.0.1
 * req.params：获取路由的params
 * req.path：获取请求路径
 * req.protocol：获取协议类型
 * req.query：获取URL的查询参数串
 */

/**
 * response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。
 * res.cookie(name，value [，option])：设置Cookie
 * res.clearCookie()：清除Cookie
 * res.get()：返回指定的HTTP头
 * res.json()：传送JSON响应
 * res.jsonp()：传送JSONP响应
 * res.send()：传送HTTP响应
 * res.status()：设置HTTP状态码
 * res.type()：设置Content-Type的MIME类型
 */
app.get('/',(req,res) => {
    console.log('请求对象的相关参数',req.path)

    res.send('Hello word')
})

let server = app.listen(8080,'localhost',() => {
    let host = server.address().address
    let port = server.address().port

    console.log(`当前实例运行的地址为: http://${host}:${port}`)
})