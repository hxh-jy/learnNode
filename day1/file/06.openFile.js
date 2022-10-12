let fs = require('fs')

fs.open('../../resource/04.test.txt','r+',(err,fd) => {
    if (err) {
        console.log('打开文件失败',err)
    }
    console.log('打开文件成功',fd)
})