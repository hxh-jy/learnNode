const fs = require('fs')
// options 代表编码格式读取

/**
 * 异步读取文件
 * fs.readFile(path,[,options],callback)
 * 异步读取文件的方法，函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)
*/ 
// fs.readFile('../../resource/01.txt',(err,data) => {
//     if (err) {
//         console.log('读取文件失败')
//     }
//     console.log('异步读取到的文件数据:',data.toString())
// })

/**
 * 同步读取文件
 * fs.readFileSync(path)
 * 文件的返回值是一个Buffer,需要通过toString方法转换一下,或者通过设置utf-8读取形式
 * <Buffer e6 b5 8b e8 af 95 e8 af bb e6 96 87 e4 bb b6>
 */

let data = fs.readFileSync('../../resource/01.txt','utf-8')
console.log('测试同步读取文件',data)