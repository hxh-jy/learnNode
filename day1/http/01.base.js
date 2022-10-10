let http = require('http')

// 创建web服务器实例
const server = http.createServer()

// 为服务器绑定request事件,监听客户端发送的请求
server.on('request', (req, res) => {
    // req 客户端的相关请求信息
    console.log('测试客户端的相关数据',req.url)

    let content = '<h1>404 Not found!<h1>'
    let url = req.url
    console.log(url == '/')
    if (url === '/' || url === '/index.html') {
        content = '<h1>首页</h1>'
    } else if (url === '/about.html') {
        content = '<h1>关于页面</h1>'
    } 
 
     // 防止中文乱码，设置响应头
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    // res.send 给客户端发送指定内容并结束这次请求
    res.end(content)
})
// 启动web服务器监听端口
server.listen(80,() => {
    console.log('启动服务器：http://127.0.0.1')
})