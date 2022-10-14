let fs = require('fs')

let writeStream = fs.createWriteStream('../resource/output.txt')
let data = '创建写入流'

// 使用 utf8 编码写入数据
writeStream.write(data,'utf-8')

writeStream.on('finish',() => {
    console.log('写入完成')
})
writeStream.on('error',(err) => {
    console.log('写入错误',err)
})
console.log('程序执行完成')