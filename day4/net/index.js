let net = require('net')

let server = net.createServer()
server.on('connection',(socket) => {
    socket.on('data', function (data) { 
        socket.write('hello'); 
    })
    socket.on('end', function () { 
        console.log('接开'); 
    }); 
    socket.write("欢迎\n");
})

let app = server.listen(8080,'localhost',() => {
    let host = app.address().address
    let port = app.address().port
    console.log('server运行地址为: ',`http://${host}:${port}`)
})