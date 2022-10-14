let fs = require('fs')
let zlib = require('zlib')
// 创建可读流
// let readStream = fs.createReadStream('../resource/test.txt')
// // 创建一个可写流
// let writeStream = fs.createWriteStream('../resource/zlib.txt.gz')

// // 压缩 input.txt 文件为 zlib.txt.gz
// readStream.pipe(zlib.createGzip())
//           .pipe(writeStream)

// 解压缩程序
fs.createReadStream('../resource/zlib.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('../resource/zlib.txt'))
console.log('程序执行完毕')