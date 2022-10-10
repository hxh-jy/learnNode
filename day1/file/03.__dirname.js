const fs = require('fs')

// options 默认值utf8
// fs.writeFile(path,data[,options],callback) 写入成功 err=null

/**
 * 以下的path参数代表是在当前js的目录(即day1目录)下的resource目录下新建02.testWrite.txt文件
 * 由于当前js的目录(即day1目录)下没有resource目录，所以以下创建文件的方式会失败
 *  */ 
fs.writeFile(__dirname + '/resource/02.testWrite.txt','测试写文件',(err) => {
    console.log(err == null)
    if (err == null) {
        return console.log('写入成功')
    } else {
        return console.log('写入失败' + err)
    }
})

// __dirname 代表当前js所在的目录
console.log('测试__dirname',__dirname)