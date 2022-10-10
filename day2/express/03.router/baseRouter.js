const express = require('express')

let app = express()

app.get('/',(req,res) => {
    res.send('get请求  主页')
})

app.post('/',(req,res) => {
    res.send('post请求  主页')
})

app.get('/user',(req,res) => {
    res.send('用户列表页')
})

app.get('/ab*cd',(req,res) => {
    res.send('正则匹配页')
})

let server = app.listen(8080,'localhost',() => {
    let host = server.address().address
    let port = server.address().port

    console.log(`当前实例运行的地址为:http://${host}:${port}`)
})