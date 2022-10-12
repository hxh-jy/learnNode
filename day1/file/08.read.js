var fs = require('fs')
// 创建一个Buffer缓冲区用于存放数据
var buf = new Buffer.alloc(1024);

fs.open('input.txt','r+',(err,fd) => {
    if (err) {
        return console.log(err)
    }
    console.log('文件打卡成功\n准备读取文件')
    fs.read(fd,buf,0,buf.length,0,(err,bytes) => {
        if (err) {
            console.log('err',err)
        }
        console.log('字节被读取',bytes,fd)
        if (bytes > 0) {
            console.log(buf.slice(0,bytes).toString())
        }
    })
})