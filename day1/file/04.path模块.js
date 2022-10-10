let path = require('path')

/**
 * path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
长度为零的 path 片段会被忽略。 如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录。
 */
let pathStr = path.join('/foo', '/bar', '/baz', '/quux');
// console.log('测试path的join方法',pathStr)

let path2 = path.join(__dirname,'./files/1.txt')
// console.log('path2: '+ path2)
/**
 * path.basename(path[,ext])  从路径字符串中取出文件名
 * path.extname(path) 从路径字符串中取出文件扩展名
 * path.parse(path) 返回一个对象，对象的属性表示path的元素，返回的对象有如下属性
*   dir <string> 
    root <string>
    base <string>
    name <string>
    ext <string>
 */
// console.log('获取文件名:' + path.basename(path2) + '\n' + '获取扩展名: ' + path.extname(path2))
let obj = path.parse('/home/user/dir/file.txt');
// 返回:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
console.log('*****',obj)