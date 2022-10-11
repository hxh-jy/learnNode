let express = require('express')

let app = express()

// 可以通过express.urlencoded这个中间件解析表单中的url-encoded格式的数据
app.use(express.urlencoded({extended: false}))

app.post('/user',(req,res) => {
    // 在服务器，可以使用req.body这个属性，来接收客户端发送过来的请求体数据
	// 默认情况下，如果不配置解析表单数据的中间件，则req.body默认等于undefined
    console.log(req.body)
    res.send('ok')
})
let server = app.listen(3002,'localhost',() => {
    let host = server.address().address
    let port = server.address().port
    console.log(`该实例运行的地址是: http://${host}:${port}`)
})