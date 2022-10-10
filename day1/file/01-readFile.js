const fs = require('fs')
// options 代表编码格式读取
// fs.readFile(path,[,options],callback)
fs.readFile('../resource/01.txt','utf-8',(err,data) => {
    if (err) {
        console.log('读取文件失败')
    }
    console.log('读取到的文件数据:',data)
})
