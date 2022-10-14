let fs = require('fs')

let data = ''

// 创建可读流
let readStream = fs.createReadStream('../resource/test.txt')
readStream.setEncoding('utf-8')
// 处理流事件 data\end\error
readStream.on('data',(chunk) => {
    console.log('chunk',chunk)
    data += chunk
})

readStream.on('end',() => {
    console.log('data: ',data)
})

readStream.on('error',err => {
    console.log('读取错误',err,err.stack)
})

console.log('程序执行完毕')