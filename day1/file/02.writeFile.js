const fs = require('fs')

// options 默认值utf-8
// fs.writeFile(path,data[,options],callback) 写入成功 err=null
fs.writeFile('../resource/02.testWrite.txt','测试写文件',(err) => {
    console.log(err == null)
    if (err == null) {
        return console.log('写入成功')
    } else {
        return console.log('写入失败' + err)
    }
})