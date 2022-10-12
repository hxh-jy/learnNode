var fs = require("fs");

// console.log("准备删除文件！");
// fs.unlink('input.txt', function(err) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("文件删除成功！");
// });

// 创建目录
// fs.mkdir(__dirname + '/test',(err) => {
//     if (err) {
//         return console.log('创建目录失败',err)
//     }
//     console.log('目录创建成功')
//     fs.writeFile(__dirname + '/test'+ '/temp.txt','创建文件',(err,data) => {
//         err ? console.log(err) : console.log('文件创建成功',data)
//     })
// })

// 读取目录
/**
 * 参数使用说明如下：
 * path - 文件路径。
 * callback - 回调函数回调函数带有两个参数err, files，err 为错误信息
 * files 为 目录下的文件数组列表。
 */
// fs.readdir(__dirname + '/test',(err,files) => {
//     if (err) {
//         return console.log('读取目录失败',err)
//     }
//     console.log('读取目录',files)
//     files.forEach(file => {
//         console.log('file',file)
//     })
// })

// 删除目录
fs.rmdir(__dirname + '/test/temp',err => {
    if (err) {
        return console.log('删除目录失败',err)
    }
    fs.readdir(__dirname + '/test',(err,files) => {
        if (err) {
            return console.log('读取目录失败',err)
        }
        console.log('读取目录',files)
        files.forEach(file => {
            console.log('file',file)
        })
    })
})