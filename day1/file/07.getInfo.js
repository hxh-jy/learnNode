let fs = require('fs')

/**
 * 获取文件信息 
 * stats.isFile() 如果是文件返回 true，否则返回 false。
 * stats.isDirectory() 判断是否是目录
 * 
 */
fs.stat('../../resource/04.test.txt',(err,stats) => {
    // console.log('判断是否属于文件',stats.isFile())
    // console.log('判断是否是目录',stats.isDirectory())
    console.log('文件相关信息',stats)
})