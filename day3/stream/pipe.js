/**
 * 管道流
 * 从一个流中读取数据然后写入另外一个流中
 */
let fs = require('fs')

// 创建可读流
let readStream = fs.createReadStream('../resource/test.txt')
// 创建一个可写流
let writeStream = fs.createWriteStream('../resource/pipe.txt')

// 管道流写操作
readStream.pipe(writeStream)

console.log('程序执行完毕')